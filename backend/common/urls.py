from django.urls import path
from .views import ApiRoot, RegisterUser

app_name="common"
urlpatterns = [
    path("", ApiRoot.as_view(), name="apiRoot"),
    path("register/", RegisterUser.as_view(), name="registerUser"),        
]