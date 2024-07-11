from django.contrib import admin
from .models import Question, Answer
# Register your models here.

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display=("subject", "content", "create_date")
    search_fields=("subject", "create_date")

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display=("content",)
