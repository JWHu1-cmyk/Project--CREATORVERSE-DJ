


***
https://github.com/shreys7/django-todo
// tried to search django sqlliite project, 
// could not find anyhitng
// so I searched sample djagno proejct
// found a article detailing list of project from begingner to adanced
// used todo app, searched on github

```
$ pip install -r requirements/local.txt
$ python manage.py migrate
$ python manage.py runserver
```

```
$ pip uninstall django
$ pip install -r requirements/local.txt
$ python manage.py migrate

$ python manage.py runserver
```



```
$ git clone https://github.com/shreys7/django-todo.git

$ python manage.py makemigrations

$ python manage.py migrate

$ python manage.py runserver

```



```
Open the database: sqlite3 path/to/your/database.db
List tables: .tables
Query data: SELECT * FROM table_name;
```



```
2|Hacktoberfest Updates|2019-12-01 18:42:17.755709|2019-12-02 19:33:58.794434|0
3|Send Resume Google now !|2019-12-01 20:03:44.551532|2019-12-02 16:56:47.535465|0
22|he|2024-09-16 00:20:09.307431|2024-09-16 00:20:09.307559|0
```



***
```
./manage.py search_index --rebuild
```
// stored within start.sh




***
```
python manage.py shell

from todos.models import Todo
todo = Todo(
    title="yee ha"
)
todo.save()

from todos.documents import todoDocument
s = todoDocument.search().query("match", title="send re")

for hit in s:
    print(
        "Todo Title : {}".format(hit.title)
    )
```
// sample



```
import os

# Get the current working directory
current_directory = os.getcwd()

print("Current Working Directory:", current_directory)

from creators.documents import CreatorsDocument
s = CreatorsDocument.search().query("match", name="Junwei")

for hit in s:
    print(
        "Item Title : {}".format(hit.name)
    )
```
// works. but it's not the implementation of the code.



***
```
from django.test import RequestFactory
from creators.views import search_view

# Create a RequestFactory instance
factory = RequestFactory()

# Create a GET request with a query parameter
request = factory.get('/search/', {'q': 'Creator'})

# Call the view function
response = search_view(request)

# Print the response content
print(response.content)

```
// this is the implementation of the code base.

```
curl "https://backend-production-d542.up.railway.app/search/?q=creator"

http://127.0.0.1:8000/search/?q=creator
```



***
showCreators.jsx

```
import requests

# Replace with your actual backend URL
base_url = "https://backend-production-d542.up.railway.app"
query = "Creator"  # Replace with the search term you want to test

response = requests.get(f"{base_url}/search/", params={"q": query})

print("Status Code:", response.status_code)
print("Headers:", response.headers)
print("Content:", response.text)

# If the response is JSON, you can use:
try:
    data = response.json()
    print("JSON Data:", data)
except ValueError:
    print("Response is not JSON")
```

got
```
Authorization Exception at /search/
AuthorizationException(403,
'security_exception', 'action [indices:data/read/search] is unauthorized for user [anonymous_user] with effective roles [anonymous_role] on indices [creatorss], this action is granted by the index privileges [read,all]')
```