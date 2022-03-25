from rest_framework import serializers

from .models import Dining, LectureHall, Residence, PhoneNumber, \
                    ForumPost, ForumReply, Student

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


class StudentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'username', 'password', 'profile_pic']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ForumReplySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = ForumReply
        fields = '__all__'


class ForumPostSerializer(serializers.HyperlinkedModelSerializer):
    forum_replies = ForumReplySerializer(many=True)
    class Meta:
        model = ForumPost
        fields = '__all__'



