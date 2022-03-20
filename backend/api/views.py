from rest_framework import viewsets

from .models import Dining, LectureHall, Residence, PhoneNumber, \
                    ForumPost, ForumReply
from django.contrib.auth.models import User
from .serializers import DiningSerializer, ForumPostSerializer, ForumReplySerializer, LectureHallSerializer, \
                         ResidenceSerializer, PhoneNumberSerializer, \
                         UserSerializer

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

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ForumPostViewSet(viewsets.ModelViewSet):
    queryset = ForumPost.objects.all().order_by('poster__id')
    serializer_class = ForumPostSerializer


class ForumReplyViewSet(viewsets.ModelViewSet):
    queryset = ForumReply.objects.all().order_by('original_post__poster__id')
    serializer_class = ForumReplySerializer
