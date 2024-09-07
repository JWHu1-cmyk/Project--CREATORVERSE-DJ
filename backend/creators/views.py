from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CreatorSerializer
from .models import Creators

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

# Create your views here.

class CreatorsView(viewsets.ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    
    serializer_class = CreatorSerializer
    queryset = Creators.objects.all()
    
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']
    
    # @method_decorator(cache_page(60 * 30))  # Cache GET requests for 30 minutes
    # def list(self, request, *args, **kwargs):
    #     return super().list(request, *args, **kwargs)

    # @method_decorator(cache_page(60 * 30))  # Cache retrieve requests for 30 minutes
    # def retrieve(self, request, *args, **kwargs):
    #     return super().retrieve(request, *args, **kwargs)