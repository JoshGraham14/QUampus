from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'dining', views.DiningViewSet)
router.register(r'lecturehall', views.LectureHallViewSet)
router.register(r'residence', views.ResidenceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]