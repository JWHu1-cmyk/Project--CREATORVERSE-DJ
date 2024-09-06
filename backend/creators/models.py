from django.db import models
from django.utils import timezone
# Create your models here.

class Creators(models.Model):
    # id = models.AutoField(primary_key=True)
    # id = models.IntegerField(primary_key=True)
    # created_at = models.DateField(auto_now_add=True)
    creator_id = models.AutoField(primary_key=True, serialize=True)
    created_at = models.TextField()
    name = models.TextField()
    url = models.TextField()
    description = models.TextField()
    imageurl = models.TextField()
    
    # class Meta:
        # managed = True
        # db_table = 'creator'  # Or any name you prefer

    def _str_(self):
        return self.title
    
 