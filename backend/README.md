# what's done  
pip install djangorestframework-simplejwt  
common/urls.py simple-jwt 설정 (issue, refresh, validate)  
config/settings.py수정 drf view의 기본 authenticator설정  
config/settings.py수정 drf view의 기본 permission 설정  
(view 마다 permission_classes, authenticate_class로 개별설정가능)  

authenticator는 하나라도 통과하면 통과  
permission은 모두 통과해야 permitted  

config/settings.py INSTALLED_APPS에 'rest_framework_simplejwt.token_blacklist',추가  
config/settings.py에 simplejwt 세팅값 설정    
'ROTATE_REFRESH_TOKENS': True,  
'BLACKLIST_AFTER_ROTATION': True,  

blacklist 테이블이 생성되도록  
python manage.py makemigrations  
python manage.py migrate

common/serializers.py에 ExpireToken뷰에서 쓸 시리얼라이저 추가
common/views.py에 로그아웃 뷰 추가후 post로 전달받은 refreshToken blacklist에 추가하도록 설정  
common/urls.py에 로그아웃 url추가 

common/views.py에 registerUser View가 authentication없이 접근가능하도록 변경
common/views.py에 ExpireToken뷰도 default Auth와 Permission 사용하도록 변경



