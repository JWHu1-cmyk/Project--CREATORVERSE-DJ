from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry

from .models import Creators

@registry.register_document
class CreatorsDocument(Document):
    class Index:
        name = "creatorss"
        settings = {
            "number_of_shards": 1,
            "number_of_replicas": 0
        }
        
    class Django:
        model = Creators
        fields = [
            'id',
            'created_at',
            'name',
            'url',
            'description',
            'imageurl'
        ]