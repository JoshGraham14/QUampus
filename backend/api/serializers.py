from rest_framework import serializers

from .models import Dining, LectureHall, Residence, PhoneNumber

class DiningSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Dining
        fields = '__all__'


class LectureHallSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LectureHall
        fields = '__all__'


class ResidenceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Residence
        fields = '__all__'


class PhoneNumberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PhoneNumber
        fields = '__all__'