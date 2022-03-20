from django.contrib import admin

from .models import Dining, LectureHall, Residence, \
                    PhoneNumber, ForumPost, ForumReply

admin.site.register(Dining)
admin.site.register(LectureHall)
admin.site.register(Residence)
admin.site.register(PhoneNumber)
admin.site.register(ForumPost)
admin.site.register(ForumReply)
