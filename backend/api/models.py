from django.db import models
from django.forms import CharField

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
