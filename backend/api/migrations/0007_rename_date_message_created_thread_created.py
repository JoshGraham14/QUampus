# Generated by Django 4.0.3 on 2022-04-01 22:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_thread_message'),
    ]

    operations = [
        migrations.RenameField(
            model_name='message',
            old_name='date',
            new_name='created',
        ),
        migrations.AddField(
            model_name='thread',
            name='created',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
