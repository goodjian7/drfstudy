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
from django.views.generic import TemplateView

# 이 함수는 사용하지 않음. 
# 동적으로 static을 배포하기 때문에 python manage.py collectstatic으로 static 파일을 모으지 못함. 
# 대신에 django의 기본 template과 static 폴더 구조를 이용해 templateView로 index.html를 배포함. 
# def pybo_redirect(request, resource):
# 	BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# 	BASE_DIR = os.path.dirname(BASE_DIR)
# 	resourceDir = os.path.join(BASE_DIR, 'pybo', 'dist')
# 	return serve(request, resource, resourceDir)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/common/", include("common.urls")),
    path("api/pybo/", include("pybo.urls")), 
	path("", TemplateView.as_view(template_name='pybo/index.html'), name='pybo_index'),	
]
