# what's done  
pybo/pagination.py에 max_limit 포함 pagination 클래스추가  
pybo/views.py의 QuestionLC View에 pagination 클래스 설정  
  
python manage.py makemigrations  
python manage.py migrate  
python manage.py shell  

아래 코드로 Question 300개 생성
```
from pybo.models import Question  
for i in range(300):  
    q = Question(subject=f"{i}-Question", content=f"{i}-Question's Content")  
    q.save()  
```
  
다음 api로 pagination 적용여부 확인  
http://localhost:8000/api/pybo/question?offset=10&limit=10  
