from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'dining', views.DiningViewSet)
router.register(r'lecturehall', views.LectureHallViewSet)
router.register(r'residence', views.ResidenceViewSet)
router.register(r'numbers', views.PhoneNumberViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'posts', views.ForumPostViewSet)
router.register(r'replies', views.ForumReplyViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]