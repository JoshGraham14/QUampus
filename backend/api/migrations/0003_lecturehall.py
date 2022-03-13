# Generated by Django 4.0.3 on 2022-03-13 01:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_dining_lat_dining_long'),
    ]

    operations = [
        migrations.CreateModel(
            name='LectureHall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=40)),
                ('address', models.CharField(max_length=40)),
                ('faculty', models.CharField(max_length=20)),
                ('lat', models.DecimalField(decimal_places=6, default=44.2253, max_digits=9)),
                ('long', models.DecimalField(decimal_places=6, default=-76.4951, max_digits=9)),
            ],
        ),
    ]