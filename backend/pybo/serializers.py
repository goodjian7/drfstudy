from rest_framework import serializers
from .models import Question, Answer
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


class AnswerSerializer(serializers.ModelSerializer):    
    username = serializers.CharField(source='user.username', read_only=True)    
    class Meta:
        model = Answer
        fields = ['id','username', 'user', 'content', 'question']
        read_only_fields=['create_date']

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True) 
    class Meta:
        model = Question
        #fields = ['id', 'user', 'username', 'subject', 'content', 'answers', 'create_date']
        fields = ['id', 'username', 'user', 'subject', 'content', 'answers', 'create_date']
        read_only_fields = ['create_date']