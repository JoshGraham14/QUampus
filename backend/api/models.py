import os
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

class Dining(models.Model):
    name = models.CharField(max_length=40)
    location = models.CharField(max_length=40)
    alt_name = models.CharField(max_length=20)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=44.2253)
    long = models.DecimalField(max_digits=9, decimal_places=6, default=-76.4951)

    def __str__(self):
        return self.name

class LectureHall(models.Model):
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=40)
    faculty = models.CharField(max_length=20)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=44.2253)
    long = models.DecimalField(max_digits=9, decimal_places=6, default=-76.4951)

    def __str__(self):
        return self.name

class Residence(models.Model):
    name = models.CharField(max_length=40)
    address = models.CharField(max_length=40)
    alt_name = models.CharField(max_length=20)
    lat = models.DecimalField(max_digits=9, decimal_places=6, default=44.2253)
    long = models.DecimalField(max_digits=9, decimal_places=6, default=-76.4951)

    def __str__(self):
        return self.name

class PhoneNumber(models.Model):
    name = models.CharField(max_length=30)
    number = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.name}: {self.number}'


class Student(AbstractUser):
    profile_pic = models.ImageField(default='default-user.png')
    REQUIRED_FIELDS = []
    

class ForumPost(models.Model):
    message = models.TextField()
    poster = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='posts', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if len(self.message) < 40:
            return self.message
        else:
            return f'{self.message[:39]} ...'

class ForumReply(models.Model):
    message = models.TextField()
    poster = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='replies', on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    original_post = models.ForeignKey(ForumPost, related_name='forum_replies', on_delete=models.CASCADE, null=True)

    def __str__(self):
        if len(self.message) < 40:
            return f'{self.poster} said: {self.message}'
        else:
            return f'{self.poster} said: {self.message[:39]} ...'
