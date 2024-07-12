from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import rest_framework.status as status 
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer, ExpireTokenSerializer
from rest_framework.validators import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken



class ApiRoot(APIView):
    permission_classes = [AllowAny]
    def get(self,request):
        return Response({
            "registerUser":reverse("common:registerUser", request=request),
        })


class RegisterUser(GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]
    def post(self, request):        
        try:
            serializer = UserRegistrationSerializer(data=request.data)                
            serializer.is_valid(raise_exception=True)            
            user = serializer.save()
            return Response(UserRegistrationSerializer(user).data, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:                
            return Response({"error":e.detail}, status=status.HTTP_400_BAD_REQUEST)

        
class ExpireToken(GenericAPIView):
    serializer_class = ExpireTokenSerializer    
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            serializer = ExpireTokenSerializer(data=request.data)                
            serializer.is_valid(raise_exception=True)            
            refreshToken = serializer.validated_data["refreshToken"]
            refreshToken = RefreshToken(refreshToken)
            refreshToken.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        
        except ValidationError as e:                
            return Response({"error":e.detail}, status=status.HTTP_400_BAD_REQUEST)

            


        
        
            