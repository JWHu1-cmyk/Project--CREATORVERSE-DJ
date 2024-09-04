from django.db import models

# Create your models here.

class Creators(models.Model):
    id = models.IntegerField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    name = models.TextField()
    url = models.TextField()
    description = models.TextField()
    imageurl = models.TextField()
    
    class Meta:
        db_table = 'creatorverse1'  # Or any name you prefer

    def _str_(self):
        return self.title