from django.urls import include, path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'dining', views.DiningViewSet)
router.register(r'lecturehall', views.LectureHallViewSet)
router.register(r'residence', views.ResidenceViewSet)
router.register(r'numbers', views.PhoneNumberViewSet)
router.register(r'users', views.StudentViewSet)
router.register(r'posts', views.ForumPostViewSet)
router.register(r'replies', views.ForumReplyViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('register', views.RegisterView.as_view()),
    path('login', views.LoginView.as_view(),),
    path('user', views.UserView.as_view()),
    path('logout', views.LogoutView.as_view()),
    path('image-upload', views.ImageUploadView.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)