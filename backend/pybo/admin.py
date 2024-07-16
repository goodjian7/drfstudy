from django.contrib import admin
from .models import Question, Answer, QuestionVoter, AnswerVoter
# Register your models here.

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display=("subject", "content", "create_date")
    search_fields=("subject", "create_date")

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display=("content",)

@admin.register(QuestionVoter)
class AnswerAdmin(admin.ModelAdmin):
    list_display=("pk",'user','question')

@admin.register(AnswerVoter)
class AnswerAdmin(admin.ModelAdmin):
    list_display=('pk','user','answer')
