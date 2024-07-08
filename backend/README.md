# what's done  
common/views.py수정하여 docs에서 registerUser api가 입력폼 표기  
common/views.py수정하여 username중복시 에러메시지 + 400 response  
common/serializers.py 수정하여 동일이름의 유저가 있으면 예외발생하도록 수정  
common/serializers.py 수정하여 field에러및 동일 username사용에러 response반환내용 수정

pip install djangorestframework-simplejwt  
common/urls.py simple-jwt 설정  
config/settings.py수정 simple-jwt 설정  
