from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='questions', null=True)
    subject = models.CharField(max_length=200, null=False)
    content = models.TextField(null=False)
    create_date = models.DateTimeField(auto_now_add=True)    
    voters = models.ManyToManyField(User, through="QuestionVoter", related_name='voted_questions')

    def __str__(self):
        return self.subject
    
class QuestionVoter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user', 'question')


class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='answers', null=True)
    content = models.TextField(null=False)
    create_date = models.DateTimeField(auto_now_add=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    voters = models.ManyToManyField(User, through="AnswerVoter", related_name='voted_answers')


    def __str__(self):
        return self.content
    
class AnswerVoter(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('user', 'answer')