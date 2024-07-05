from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
import rest_framework.status as status 
from rest_framework.reverse import reverse
from django.contrib.auth.models import User
from .serializers import UserRegistrationSerializer



class ApiRoot(APIView):
    def get(self,request):
        return Response({
            "registerUser":reverse("common:registerUser", request=request),
        })


class RegisterUser(APIView):
    def post(self, request):        
        serializer =UserRegistrationSerializer(data=request.data)                
        if serializer.is_valid():
            print("serializer is_valid")
            user = serializer.save()
            return Response(UserRegistrationSerializer(user).data, status=status.HTTP_201_CREATED )

        print("serializer is_not valid")        
        print(request.data)
        return Response({"error":"invalid information"}, status=status.HTTP_400_BAD_REQUEST)
            


        
        
            