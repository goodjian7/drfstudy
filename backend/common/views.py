from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
import rest_framework.status as status 
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer
from rest_framework.validators import ValidationError



class ApiRoot(APIView):
    def get(self,request):
        return Response({
            "registerUser":reverse("common:registerUser", request=request),
        })


class RegisterUser(GenericAPIView):
    serializer_class = UserRegistrationSerializer
    def post(self, request):        
        try:
            serializer = UserRegistrationSerializer(data=request.data)                
            serializer.is_valid(raise_exception=True)            
            user = serializer.save()
            return Response(UserRegistrationSerializer(user).data, status=status.HTTP_201_CREATED)
        
        except ValidationError as e:            
            print(request.data)
            errorMessage = e.detail["non_field_errors"][0]
            return Response({"error":errorMessage}, status=status.HTTP_400_BAD_REQUEST)

        
        
            


        
        
            