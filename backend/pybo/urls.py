from django.contrib import admin
from django.urls import path
from .views import ApiRoot, QuestionLC, QuestionRUD, AnswerC, AnswerRUD

app_name="pybo"
urlpatterns = [
    path("", ApiRoot.as_view(), name="apiRoot"),
    path("question/", QuestionLC.as_view(), name="questionLC"),
    path("question/<int:pk>/",QuestionRUD.as_view(), name="questionRUD"),
    path("answer/", AnswerC.as_view(), name="answerC"),
    path("answer/<int:pk>/", AnswerRUD.as_view(), name="answerRUD"),
]