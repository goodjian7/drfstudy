from django.urls import path
from .views import ApiRoot, RegisterUser
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name="common"
urlpatterns = [
    path("", ApiRoot.as_view(), name="apiRoot"),
    path("register/", RegisterUser.as_view(), name="registerUser"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     

]