from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from creators import views

router = routers.DefaultRouter()
router.register(r'creatorss', views.CreatorsView, 'creators')

# Hu:
# The third parameter 'creators' is the base name for the URL names that will be created for this viewset.
# Here's a breakdown of the parameters:
# 1. r'creatorss': This is the URL prefix for the routes.
# views.CreatorsView: This is the viewset class.
# 'creators': This is the base name.
# The base name is used by the router to generate the names for the URL patterns. For example, if you're using a ModelViewSet, it might generate the following URL pattern names:
# creators-list
# creators-detail
# creators-create
# creators-update
# creators-delete

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]