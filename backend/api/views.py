from django.shortcuts import render

from rest_framework import viewsets

from .models import Dining, LectureHall, Residence, PhoneNumber
from .serializers import DiningSerializer, LectureHallSerializer, \
                         ResidenceSerializer, PhoneNumberSerializer

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

