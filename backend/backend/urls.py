from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from creators import views

router = routers.DefaultRouter()
router.register(r'creatorss', views.CreatorsView, 'creators')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]