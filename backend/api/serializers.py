from rest_framework import serializers

from .models import Dining, LectureHall, Residence, PhoneNumber, \
                    ForumPost, ForumReply
from django.contrib.auth.models import User

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


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ForumReplySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ForumReply
        fields = '__all__'


class ForumPostSerializer(serializers.HyperlinkedModelSerializer):
    forum_replies = ForumReplySerializer(many=True)
    class Meta:
        model = ForumPost
        fields = '__all__'



