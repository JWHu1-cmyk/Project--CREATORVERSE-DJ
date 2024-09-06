from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CreatorSerializer
from .models import Creators

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.

class CreatorsView(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    serializer_class = CreatorSerializer
    queryset = Creators.objects.all()
    
    http_method_names = ['get', 'post', 'put', 'patch', 'delete']