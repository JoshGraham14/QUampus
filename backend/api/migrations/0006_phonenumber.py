# Generated by Django 4.0.3 on 2022-03-17 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_alt_residence_alt_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhoneNumber',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('number', models.CharField(max_length=20)),
            ],
        ),
    ]