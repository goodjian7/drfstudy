from rest_framework import serializers
from .models import Question, Answer, QuestionVoter, AnswerVoter
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist


class AnswerDetailSerializer(serializers.ModelSerializer):    
    username = serializers.CharField(source='user.username', read_only=True)
    voters = serializers.SerializerMethodField()

    class Meta:
        model = Answer
        fields = ['id','username', 'user', 'content', 'question','voters',]
        read_only_fields=['create_date']

    def get_voters(self, obj):
        voters = AnswerVoter.objects.filter(answer=obj)
        return AnswerVoterSerializer(voters, many=True).data

class AnswerSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model=Answer
        fields = ['id']


class QuestionSummarySerializer(serializers.ModelSerializer):
    answers = AnswerSummarySerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True) 
    class Meta:
        model = Question
        #fields = ['id', 'user', 'username', 'subject', 'content', 'answers', 'create_date']
        fields = ['id', 'username', 'user', 'subject', 'content', 'answers', 'voters', 'create_date']
        read_only_fields = ['create_date']

class QuestionVoterSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    question=serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
    class Meta:
        model=QuestionVoter
        fields=["id", "question", "user"]               

    def create(self, validated_data):
        questionVoter = QuestionVoter.objects.create(**validated_data)
        return questionVoter

class QuestionDetailSerializer(serializers.ModelSerializer):
    answers = AnswerDetailSerializer(many=True, read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)  
    voters = serializers.SerializerMethodField()  
    class Meta:
        model = Question
        #fields = ['id', 'user', 'username', 'subject', 'content', 'answers', 'create_date']
        fields = ['id', 'username', 'user', 'subject', 'content', 'answers', 'voters', 'create_date']
        read_only_fields = ['create_date']
    
    def get_voters(self, obj):
        voters = QuestionVoter.objects.filter(question=obj)
        return QuestionVoterSerializer(voters, many=True).data
    
class AnswerVoterSerializer(serializers.ModelSerializer):
    user=serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    answer=serializers.PrimaryKeyRelatedField(queryset=Answer.objects.all())
    class Meta:
        model=AnswerVoter
        fields=["id", "answer","user"]
        

    def create(self, validated_data):
        answerVoter = AnswerVoter.objects.create(**validated_data)
        return answerVoter