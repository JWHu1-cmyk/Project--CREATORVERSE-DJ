


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
setting:
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'http://localhost:9200'
    }
}

pip install django-elasticsearch-dsl

# settings.py
INSTALLED_APPS = [
    ...
    'django_elasticsearch_dsl',
]

document.py

python manage.py search_index --rebuild
// only have to do once

from creators.document import CreatorsDocument
BookDocument.search().query("match", title="basic").to_queryset()
// in your case it's CreatorsDocument
// get docker desmon up, and run the preivous elasticsaerch you run
// have to be in python manage.py shell 

***
// for gui production view

template/index.html
view.py




# bulk indexing exiting objects
from elasticsearch.helpers import bulk
from creators.document import CreatorsDocument
from creators.models import Creators

# Fetch all instances of the model
qs = Creators.objects.all()

# Prepare the data for bulk indexing
actions = (CreatorsDocument.get_indexing_queryset().to_dict(include_meta=True) for _ in qs)

# Perform bulk indexing
bulk(CreatorsDocument._index.connection, actions)

# testing elasticsearch locally
```
python manage.py shell

from creators.models import Creators

creator = Creators(name="diguo", description="An example creator")

creator.save()
```

# Verify Query Syntax
from creators.document import CreatorsDocument

results = CreatorsDocument.search().query("fuzzy", name="diguo").to_queryset()
for result in results:
    print(result)

# Check Indexed Data
Verify that the data is actually present in the Elasticsearch index. You can do this using the Elasticsearch API or a tool like Kibana.
Using Elasticsearch API
    
`
curl -X GET "localhost:9200/creatorss/_search?pretty"
`

`
curl -X GET "localhost:9200/_cat/indices?v"
`

# Verify Elasticsearch Connection
from elasticsearch import Elasticsearch
// verify index creation

es = Elasticsearch(['http://localhost:9200'])
print(es.ping())  # Should return True if the connection is successful



# Additional Debugging Steps
Manually Create the Index
`curl -X PUT "localhost:9200/creatorss"`
Check Index Status
`curl -X GET "localhost:9200/_cat/indices?v"`
Check Index Mapping
`curl -X GET "localhost:9200/creatorss/_mapping?pretty"`