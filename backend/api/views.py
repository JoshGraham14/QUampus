from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed

import jwt
import datetime

from decouple import config

from .models import Dining, LectureHall, Residence, PhoneNumber, \
                    ForumPost, ForumReply, Student
from .serializers import DiningSerializer, ForumPostSerializer, ForumReplySerializer, LectureHallSerializer, \
                         ResidenceSerializer, PhoneNumberSerializer, StudentSerializer


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

        response.set_cookie(key='jwt', value=token, httponly=True)
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
        serializer = StudentSerializer(user)

        return Response(serializer.data)


class LogoutView(APIView):

    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
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
