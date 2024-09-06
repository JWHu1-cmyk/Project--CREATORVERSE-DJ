# useless file for now;

# from django.urls import path
# from .views import CreatorsView

# urlpatterns = [
#     path('', CreatorsView.as_view()),
# ]

# within backend.urls
    # path('', include('myapp.urls')), # include your app urls.py here

# Purpose: This approach includes all the URL patterns defined in the myapp/urls.py file at the root level.
# Flexibility: It allows you to define multiple URL patterns within myapp/urls.py, making it easier to manage and organize your URLs, especially as your application grows.
# Modularity: It keeps your URL configurations modular and maintainable by separating concerns.