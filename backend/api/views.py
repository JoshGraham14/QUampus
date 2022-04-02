from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Q

import jwt
import datetime

from decouple import config

from .models import Dining, LectureHall, Residence, PhoneNumber, \
                    ForumPost, ForumReply, Student, Message, Thread
from .serializers import DiningSerializer, ForumPostSerializer, ForumReplySerializer, LectureHallSerializer, \
                         ResidenceSerializer, PhoneNumberSerializer, StudentSerializer, MessageSerializer, ThreadSerializer
from . import serializers


class DiningViewSet(viewsets.ModelViewSet):
    queryset = Dining.objects.all().order_by('name')
    serializer_class = DiningSerializer


class LectureHallViewSet(viewsets.ModelViewSet):
    queryset = LectureHall.objects.all().order_by('name')
    serializer_class = LectureHallSerializer


class ResidenceViewSet(viewsets.ModelViewSet):
    queryset = Residence.objects.all().order_by('name')
    serializer_class = ResidenceSerializer


class PhoneNumberViewSet(viewsets.ModelViewSet):
    queryset = PhoneNumber.objects.all().order_by('name')
    serializer_class = PhoneNumberSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):

    def post(self, request):
        username = request.data['username']
        password = request.data['password']

        user = Student.objects.filter(username=username).first()

        if user is None:
            raise AuthenticationFailed('User not found.')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, config('JWT_SECRET'), algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True, samesite='None', secure=True)
        response.data = {
            'jwt': token
        }

        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated.')

        try:
            payload = jwt.decode(token, config('JWT_SECRET'), algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated.')

        user = Student.objects.filter(id=payload['id']).first()
        serializer = StudentSerializer(user, context={'request': request})
        
        return Response(serializer.data)

    def put(self, request):
        user = Student.objects.filter(id=request.data['id']).first()
        # if the password is being updated
        if request.data['newPassword'] != '':
            if not check_password(request.data['oldPassword'], user.password):
                return Response({'status': 'Incorrect old password.'}, status=status.HTTP_200_OK)
            new_password = request.data['newPassword']
            new_password = make_password(new_password)
            serializer = StudentSerializer(user, data={'username': user.username, 
                        'password': new_password, 
                            'profile_pic': user.profile_pic,
                            'email': user.email,
                            'first_name': user.first_name})

        # if the username is being updated
        elif request.data['newUsername'] != '':
            new_username = request.data['newUsername']
            serializer = StudentSerializer(user, data={'username': new_username, 
                        'password': user.password, 
                            'profile_pic': user.profile_pic,
                            'email': user.email,
                            'first_name': user.first_name})

        # if the email is being changed
        elif request.data['newEmail'] != '':
            new_email = request.data['newEmail']
            serializer = StudentSerializer(user, data={'username': user.username, 
                        'password': user.password, 
                            'profile_pic': user.profile_pic,
                            'email': new_email,
                            'first_name': user.first_name})
                            
        # if the name is being changed
        elif request.data['newName'] != '':
            new_name = request.data['newName']
            serializer = StudentSerializer(user, data={'username': user.username, 
                        'password': user.password, 
                            'profile_pic': user.profile_pic,
                            'email': user.email,
                            'first_name': new_name})
            
        if serializer.is_valid():
            serializer.save()
            if request.data['newPassword'] != '':
                return Response({'status': 'Password updated successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ImageUploadView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, format=None):
        user = Student.objects.filter(id=request.data['id']).first()
        serializer = StudentSerializer(user, data={'username': user.username, 
                                        'password': user.password, 
                                        'profile_pic': request.data['file']})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt', samesite='None')
        response.data = {
            'message': 'success'
        }
        return response


class ForumPostViewSet(viewsets.ModelViewSet):
    queryset = ForumPost.objects.all().order_by('-created')
    serializer_class = ForumPostSerializer


class ForumReplyViewSet(viewsets.ModelViewSet):
    queryset = ForumReply.objects.all().order_by('created')
    serializer_class = ForumReplySerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('created')
    serializer_class = MessageSerializer


class ThreadViewSet(viewsets.ModelViewSet):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer

class ThreadView(APIView):
    def get(self, request):
        print(f'{request.data["id"]=}')
        id = request.data['id']
        threads = Thread.objects.filter(Q(user__id=id) | Q(receiver__id=id))
        serializer = ThreadSerializer(threads, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
