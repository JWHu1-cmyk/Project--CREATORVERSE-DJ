from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CreatorSerializer
from .models import Creators

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from django.core.cache import cache

from django.http import JsonResponse, HttpResponse
from creators.documents import CreatorsDocument
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
 
import logging

# Create your views here.

# Django DRF to axios:
# a comprehensive Django view that corresponds to all the standard DRF (Django Rest Framework) methods, along with their axios counterparts:
    # def get(self, request, pk=None):
        # axios.get
    # def post(self, request):
        # axios.post
    # def put(self, request, pk):
        # axios.put
    # def patch(self, request, pk):
        # axios.patch
    # def delete(self, request, pk):
        # axios.delete

# ModelViewSet implementation:
    # ModelViewSet automatically provides list(), create(), retrieve(), update(), partial_update(), and destroy() actions.
    # These correspond to GET (list and detail), POST, PUT, PATCH, and DELETE HTTP methods.
    # To add caching or custom logic, you can override these methods.

class CreatorsView(viewsets.ModelViewSet):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]
    
    serializer_class = CreatorSerializer
    queryset = Creators.objects.all()
    
    # http_method_names = ['get', 'post', 'put', 'patch', 'delete']

    def list(self, request):
        cached_data = cache.get('creators_list')
        if cached_data:
            return Response(cached_data)
        
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        cache.set('creators_list', serializer.data, 300)  # Cache for 5 minutes
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete('creators_list')
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete('creators_list')
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete('creators_list')
        return response
    
# claude 3.5 explanation:
# 1. queryset = self.filter_queryset(self.get_queryset())
    # self.get_queryset() retrieves the base queryset defined in the view (in this case, Creators.objects.all()).
    # self.filter_queryset() applies any filtering (e.g., from query parameters) to the queryset.
    # This allows for features like search or filtering in your API.
# 2. serializer = self.get_serializer(queryset, many=True)
    # self.get_serializer() returns an instance of the serializer class specified in serializer_class.
    # many=True tells the serializer to handle multiple objects (a queryset) rather than a single instance.
    # This serializes the queryset into a format that can be easily converted to JSON.
# 3. cache.set('creators_list', serializer.data, 300)
    # This caches the serialized data.
    # 'creators_list' is the cache key.
    # serializer.data is the serialized queryset (a list of dictionaries).
    # 300 is the cache timeout in seconds (5 minutes).
# 4. return Response(serializer.data)
    # This returns the serialized data as an HTTP response.
    # Response is a DRF class that handles rendering the data into the appropriate format (usually JSON).
    

logger = logging.getLogger(__name__)

@require_http_methods(["GET", "OPTIONS"])
@csrf_exempt
def search_view(request):
    if request.method == "OPTIONS":
        response = HttpResponse()
    else:
        logger.info(f"Received request: {request.method} {request.GET}")
        query = request.GET.get('q', '')
        logger.info(f"Search query: {query}")
        s = CreatorsDocument.search().query(
            'multi_match', 
            query=query, 
            fields=['name', 'description', 'url']
        )
        response = s.execute()
        results = [{'id': hit.meta.id, 'name': hit.name, 'url': hit.url, 'description': hit.description, 'imageurl': hit.imageurl} for hit in response]
        
        # Render the HTML template
        return render(request, 'search_results.html', {'results': results, 'query': query})

    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"
    return response