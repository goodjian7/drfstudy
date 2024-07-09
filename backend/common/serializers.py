from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

'''
# drf serializer 
- write to db : dict -> ormObj -> db

```
serializer = Serializer(data={})
if serializer.is_valid():
    ormObj = serializer.save()
```

- read from db : db -> ormObj(s) -> dict or list[dict]

```
serializer = Serializer([{},{}], many=True)
serializer.data
```

- serializer override functions  
  validate, create
'''

class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    pw0 = serializers.CharField(write_only=True) # write means "to db", read means "from db"
    pw1 = serializers.CharField(write_only=True) # write means "to db", read means "from db"

    def validate(self, data):
        username = data.get("username","").strip()
        pw0 = data.get("pw0","").strip()
        pw1 = data.get("pw1","").strip()               
        
        isUserExist = False
        try:
            user = User.objects.get(username=username)            
            isUserExist = True
        except ObjectDoesNotExist:            
            isUserExist = False        

        if username=="" or pw0 == "" or pw1 == "":            
            raise serializers.ValidationError("id, pw0, pw1 cannot be empty string")
        
        if isUserExist:            
            raise serializers.ValidationError("same username is already used")

        if pw0 != pw1:            
            raise serializers.ValidationError("Passwords do not match.")
                
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['pw0'],
        )
        return user
    
class ExpireTokenSerializer(serializers.Serializer):
    refreshToken = serializers.CharField()

    def validate(self, data):
        refreshToken=data.get("refreshToken", "").strip()

        if refreshToken == "":            
            raise serializers.ValidationError("refreshToken is empty")
        
        return data
    
    def create(self, validated_data):        
        return validated_data["refreshToken"]