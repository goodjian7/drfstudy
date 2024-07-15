# Project
drf와 react 공부용 개인 프로젝트 입니다.  
wikidocs jumptofastapi pybo 프로젝트를 drf+react로 구현합니다.

# How to  
- reqruiements  
  python 3.12, node 18.17.1  

- hot to download repository  
  git clone https://github.com/goodjian7/drfstudy.git  

- how to run backend  
  cd drfstudy  
  cd backend  
  pip install -r requirements.txt  
  python manage.py makemigrations  
  python manage.py migrate  
  python manage.py runserver  
  
- how to run frontend  
  cd drfstudy  
  cd frontend  
  npm install  
  npm run dev  
  
   
# What's Done
- 프로젝트 환경설정  
- Question, Answer CRUD API구현  
- Question List API pagination 구현  
- CORS 설정  
- UI Bootstrap 설정  
- UI react-router-dom 설정  
- UI Question List  
- UI Question List with Answer Count  
- UI Question Create  
- UI Question Detail  
- UI Answer Create UI 
- 유저생성 API
- 유저생성 API docs에서 입력폼 제공
- UI 유저생성 
- UI 유저생성 field 검증결과 디스플레이
- djangoorestframework-simplejwt으로 로그인 기능 구현
- djangoorestframework-simplejwt으로 로그아웃 기능 구현
- djangoorestframework-simplejwt으로 API Auth와 Permission 추가
- Question, Answer모델을 Admin에 추가
- Authorization 헤더를 쉽게 쓰기위한 authAxios util함수 추가
- Question, Answer에 유저정보 포함하도록 변경
- Question, Answer의 유저정보를 UI상에서 표기하도록 변경