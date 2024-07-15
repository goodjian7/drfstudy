from rest_framework import serializers
from .models import Question, Answer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


class AnswerSerializer(serializers.ModelSerializer):    
    username = serializers.CharField(source='user.username', read_only=True)
    user = serializers.SlugRelatedField(
        slug_field='username', queryset=User.objects.all(), write_only=True
    )
    class Meta:
        model = Answer
        fields = ['id','username', 'user', 'content', 'question']
        read_only_fields=['create_date']

    def validate(self, data):
        username = data.get('user', '')
        isUserExist = False
        try:
            user = User.objects.get(username=username)            
            isUserExist = True
        except ObjectDoesNotExist:            
            isUserExist = False        

        if not isUserExist:            
            raise serializers.ValidationError("wrong username")
                
        return data

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)
    user = serializers.SlugRelatedField(
        slug_field='username', queryset=User.objects.all(), write_only=True
    )
    
    class Meta:
        model = Question
        fields = ['id', 'user', 'username', 'subject', 'content', 'answers', 'create_date']
        read_only_fields = ['create_date']

    def validate(self, data):
        username = data.get('user', '')
        isUserExist = False
        try:
            user = User.objects.get(username=username)            
            isUserExist = True
        except ObjectDoesNotExist:            
            isUserExist = False        

        if not isUserExist:            
            raise serializers.ValidationError("wrong username")
                
        return data

    # 디폴트로 아래 동작을 수행한다. 
    # def create(self, validated_data):
    #     # Extract the user from validated_data                
    #     question = Question.objects.create(**validated_data)
    #     return question

