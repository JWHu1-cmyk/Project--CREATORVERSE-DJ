from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CreatorSerializer
from .models import Creators

# Create your views here.

class CreatorsView(viewsets.ModelViewSet):
    serializer_class = CreatorSerializer
    queryset = Creators.objects.all()