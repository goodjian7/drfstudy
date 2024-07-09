from django.urls import path
from .views import ApiRoot, RegisterUser, ExpireToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

app_name="common"
urlpatterns = [
    path("", ApiRoot.as_view(), name="apiRoot"),
    path("register/", RegisterUser.as_view(), name="registerUser"),
    path('token/issue/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path("token/expire/", ExpireToken.as_view(), name="token_expire"),
]