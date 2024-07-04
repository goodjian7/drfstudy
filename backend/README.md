# what's done 
python manage startapp pybo  
config/settings.py 수정  
  
models.py에 Question, Answer모델 추가  
python manage.py makemigrations  
python manage.py migrate  
  
pybo/serializers.py 추가/수정  
pybo/views.py 수정  
pybo/urls.py 추가/수정  
  
config/urls.py 수정  
python manage.py runserver 
http:localhost:8000/api/pybo 접속후 docs에서 CRUD확인  
