from django.db import models
from django.utils import timezone
# Create your models here.

class Creators(models.Model):
    id = models.AutoField(primary_key=True)
    # id = models.IntegerField(primary_key=True)
    # created_at = models.DateField(auto_now_add=True)
    created_at = models.TextField(editable=False)
    name = models.TextField()
    url = models.TextField()
    description = models.TextField()
    imageurl = models.TextField()
    
    class Meta:
        db_table = 'creator'  # Or any name you prefer

    def _str_(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.id:
            now = timezone.now()
            self.created_at = now.strftime("%Y-%m-%d %H:%M:%S")
            self.created_at_date = now
        super(Creators, self).save(*args, **kwargs)