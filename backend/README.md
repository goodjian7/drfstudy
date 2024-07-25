# what's done  
- index.html을 pybo/templates/pybo/index.html로 이동   
  해당 폴더 html템플릿은 pybo/*.html형태로 사용가능  
- assets폴더를 pybo/static/pybo로 이동  
  해당 폴더 static파일은 static/pybo/**/* 형태 url로 접근가능  
- config/urls.py 수정하여 templateView를 이용해 index.html배포하도록 수정
- pybo/templates/pybo/index.html 의 base노드 추가하여 css, js파일경로를 수정  
  assets/*.css -> static/pybo/assets/*.css  
  assets/*.js -> static/pybo/assets/*.js  