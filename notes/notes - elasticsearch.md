


***
https://www.youtube.com/watch?v=lKanpfkhxv0&t=383s

***
 docker run -d \
  --name elasticsearch \
  -p 9200:9200 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  -v esdata01:/usr/share/elasticsearch/data \
  docker.elastic.co/elasticsearch/elasticsearch:8.13.0

```
allows elasticsearch local dev
```

``` 
Common IP Addresses:
127.0.0.1 (localhost) is used for local development and testing.
0.0.0.0 means the service listens on all available network interfaces.
In production, you would use the actual IP address or DNS name of the host.
``` 
don't matter now;
instead I did search template on railway. 
searched elasticsearch.
run a pretty self contained elasticsearch container that exposes port.




***
# setting.py
```
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'http://localhost:9200'
    }
}
```

# shell
`pip install django-elasticsearch-dsl`

# settings.py
```
INSTALLED_APPS = [
    ...
    'django_elasticsearch_dsl',
]
```

# document.py
// has some code

```
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
```

# shell
`python manage.py search_index --rebuild`
// only have to do once

# shell
```
from creators.document import CreatorsDocument
BookDocument.search().query("match", title="basic").to_queryset()
```
// in your case it's CreatorsDocument
// get docker desmon up, and run the preivous elasticsaerch you run
// have to be in python manage.py shell 

***
view.py
// `/Users/junweihu/Documents/- local files - programming env <Hu>/- folder_codepath - Resume Project/creatorverse/backend/creators/views.py`



***
// local dev
# bulk indexing exiting objects
```
from elasticsearch.helpers import bulk
from creators.document import CreatorsDocument
from creators.models import Creators
```

## Fetch all instances of the model
`qs = Creators.objects.all()`

## Prepare the data for bulk indexing
`actions = (CreatorsDocument.get_indexing_queryset().to_dict(include_meta=True) for _ in qs)`

## Perform bulk indexing
`bulk(CreatorsDocument._index.connection, actions)`



# testing elasticsearch locally
```
python manage.py shell

from creators.models import Creators

creator = Creators(name="diguo", description="An example creator")

creator.save()
```

# Verify Query Syntax
# within python shell
```
from creators.document import CreatorsDocument

results = CreatorsDocument.search().query("fuzzy", name="diguo").to_queryset()
for result in results:
    print(result)
```

# Verify Elasticsearch Connection
```
from elasticsearch import Elasticsearch
// verify index creation

es = Elasticsearch(['http://localhost:9200'])
print(es.ping())  # Should return True if the connection is successful
```



# Check Indexed Data
// how would this work if views.pt isn't configured.
// and urls.py isn't configured
Verify that the data is actually present in the Elasticsearch index. You can do this using the Elasticsearch API or a tool like Kibana.
Using Elasticsearch API
// maybe fedault behavior by elasticssearch.dsl
```
curl -X GET "localhost:9200/creatorss/_search?pretty"
```

```
curl -X GET "localhost:9200/_cat/indices?v"
```

# Additional Debugging Steps
Manually Create the Index
`curl -X PUT "localhost:9200/creatorss"`
Check Index Status
`curl -X GET "localhost:9200/_cat/indices?v"`
Check Index Mapping
`curl -X GET "localhost:9200/creatorss/_mapping?pretty"`