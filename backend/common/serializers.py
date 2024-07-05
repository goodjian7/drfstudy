from rest_framework import serializers
from django.contrib.auth.models import User

'''
# dict -> ormObj -> db
serializer = Serializer(data={})
if serializer.is_valid():
    ormObj = serializer.save()

# db -> ormObj or ormObjs -> dict or list[dict]
serializer = Serializer([{},{}], many=True)
serializer.data
'''

class UserRegistrationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    pw0 = serializers.CharField(write_only=True) # write means "to db", read means "from db"
    pw1 = serializers.CharField(write_only=True) # write means "to db", read means "from db"

    def validate(self, data):
        username = data.get("username","").strip()
        pw0 = data.get("pw0","").strip()
        pw1 = data.get("pw1","").strip()
        
        if username=="" or pw0 == "" or pw1 == "":
            raise serializers.ValidationError("id, pw0, pw1 cannot be empty string")

        if pw0 != pw1:
            raise serializers.ValidationError("Passwords do not match.")
                
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['pw0']
        )
        return user