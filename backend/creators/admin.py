from django.contrib import admin
from .models import Creators

class CreatorsAdmin(admin.ModelAdmin):
    list_display = ('id', 'created_at', 'name', 'url', 'description', 'imageurl')

# Register your models here.

admin.site.register(Creators, CreatorsAdmin)