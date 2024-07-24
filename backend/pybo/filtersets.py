import django_filters
from .models import Question

class QuestionFilter(django_filters.FilterSet):
    class Meta:
        model = Question
        fields = {
            'user__username': ['icontains'],
            'subject': ['icontains'],
            'content': ['icontains'],
        }