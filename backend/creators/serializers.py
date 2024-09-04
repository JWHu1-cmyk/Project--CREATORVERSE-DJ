from rest_framework import serializers
from .models import Creators

class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creators
        fields = ('id', 'created_at', 'name', 'url', 'description', 'imageurl')