from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from .paginations import OffsetLimitWithMaxPagination


class ApiRoot(APIView):
    def get(self, request):
        return Response({
            "questionLC": reverse("pybo:questionLC", request=request),            
            "answerC" : reverse("pybo:answerC", request=request),
        })

class QuestionLC(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    pagination_class = OffsetLimitWithMaxPagination

class QuestionRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset= Question.objects.all()
    serializer_class = QuestionSerializer

class AnswerC(generics.CreateAPIView):
    queryset=Answer.objects.all()
    serializer_class=AnswerSerializer

class AnswerRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset=Answer.objects.all()
    serializer_class=AnswerSerializer