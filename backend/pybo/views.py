from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, exceptions
from rest_framework.reverse import reverse

from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from .models import Question, Answer, QuestionVoter, AnswerVoter
from .serializers import QuestionSummarySerializer, QuestionDetailSerializer, AnswerDetailSerializer, QuestionVoterSerializer, AnswerVoterSerializer
from .paginations import OffsetLimitWithMaxPagination
from .permissios import IsAuthorOrReadOnly

class ApiRoot(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({
            "questionLC": reverse("pybo:questionLC", request=request),            
            "answerC" : reverse("pybo:answerC", request=request),
        })

class QuestionLC(generics.ListCreateAPIView):
    queryset = Question.objects.all().order_by("-create_date")
    serializer_class = QuestionSummarySerializer    
    pagination_class = OffsetLimitWithMaxPagination   
    permission_classes = [IsAuthenticatedOrReadOnly]    

    def post(self, request, *args, **kwargs):        
        try:
            request.data["user"]=request.user.id
            return self.create(request, *args, **kwargs)        
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class QuestionRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset= Question.objects.all()
    serializer_class = QuestionDetailSerializer
    permission_classes = [IsAuthorOrReadOnly]

class AnswerC(generics.CreateAPIView):
    queryset=Answer.objects.all()
    serializer_class=AnswerDetailSerializer
    permission_classes=[IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):        
        try:
            request.data["user"]=request.user.id
            return self.create(request, *args, **kwargs)        
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    
class AnswerRUD(generics.RetrieveUpdateDestroyAPIView):
    queryset=Answer.objects.all()
    serializer_class=AnswerDetailSerializer    
    permission_classes=[IsAuthorOrReadOnly]

class QuestionVoterLC(generics.ListCreateAPIView):
    queryset=QuestionVoter.objects.all()
    serializer_class=QuestionVoterSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]        

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if request.data["user"] != request.user.id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return self.create(request, *args, **kwargs)

class QuestionVoterRD(generics.DestroyAPIView):
    queryset=QuestionVoter.objects.all()
    serializer_class=QuestionVoterSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def delete(self,request,*args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
                
        instance = self.get_object()
        if instance.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

class AnswerVoterLC(generics.ListCreateAPIView):
    queryset=AnswerVoter.objects.all()
    serializer_class=AnswerVoterSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        if request.data["user"] != request.user.id:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return self.create(request, *args, **kwargs)

class AnswerVoterRD(generics.RetrieveDestroyAPIView):    
    queryset=AnswerVoter.objects.all()    
    serializer_class=AnswerVoterSerializer
    permission_classes = [IsAuthorOrReadOnly]

    def delete(self,request,*args, **kwargs):
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
                
        instance = self.get_object()
        if instance.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)