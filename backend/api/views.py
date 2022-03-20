from rest_framework import viewsets

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


class ForumPostViewSet(viewsets.ModelViewSet):
    queryset = ForumPost.objects.all().order_by('created')
    serializer_class = ForumPostSerializer


class ForumReplyViewSet(viewsets.ModelViewSet):
    queryset = ForumReply.objects.all().order_by('created')
    serializer_class = ForumReplySerializer
