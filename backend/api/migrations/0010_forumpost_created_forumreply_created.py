# Generated by Django 4.0.3 on 2022-03-20 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_remove_forumreply_original_poster_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='forumpost',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='forumreply',
            name='created',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]