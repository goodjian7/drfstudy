from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User

class Question(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='questions', null=True)
    subject = models.CharField(max_length=200, null=False)
    content = models.TextField(null=False)
    create_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject

class Answer(models.Model):
    user = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='answers', null=True)
    content = models.TextField(null=False)
    create_date = models.DateTimeField(auto_now_add=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')

    def __str__(self):
        return self.content
    