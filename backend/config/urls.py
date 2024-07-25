"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
import os
from django.views.static import serve

def pybo_redirect(request, resource):
	BASE_DIR = os.path.dirname(os.path.abspath(__file__))
	BASE_DIR = os.path.dirname(BASE_DIR)
	resourceDir = os.path.join(BASE_DIR, 'pybo', 'dist')
	return serve(request, resource, resourceDir)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/common/", include("common.urls")),
    path("api/pybo/", include("pybo.urls")), 
	path("", lambda r : pybo_redirect(r, 'index.html')),
	path("<path:resource>/", pybo_redirect),
]
