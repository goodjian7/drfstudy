from django.contrib import admin
from django.urls import path
from .views import ApiRoot, QuestionLC, QuestionRUD, AnswerC, AnswerRUD

app_name="pybo"
urlpatterns = [
    path("pybo/", ApiRoot.as_view(), name="apiRoot"),
    path("pybo/question/", QuestionLC.as_view(), name="questionLC"),
    path("pybo/question/<int:pk>/",QuestionRUD.as_view(), name="questionRUD"),
    path("pybo/answer/", AnswerC.as_view(), name="answerC"),
    path("pybo/answer/<int:pk>/", AnswerRUD.as_view(), name="answerRUD"),
]