# Generated by Django 4.0.3 on 2022-03-13 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dining',
            name='lat',
            field=models.DecimalField(decimal_places=6, default=44.2253, max_digits=9),
        ),
        migrations.AddField(
            model_name='dining',
            name='long',
            field=models.DecimalField(decimal_places=6, default=-76.4951, max_digits=9),
        ),
    ]