# what's done  
python manage.py createsuperuser (admin/admin)  

python ./manage.py common  
config/settings.py INSTALLED_APPS 앱추가  

common/serializers.py에 유저생성용 serializer추가  
common/views.py에 apiRoot용 뷰추가  
common/views.py에 유저 등록 뷰 추가 (serializer사용)  
common/urls.py 유저생성 url추가  
config/urls.py에  common/urls.py 추가  

/api/common/ 에서 apiRoot페이지 확인  
/api/common/register/에서 유저생성 확인  
{"username":"newusername0", "pw0":"123123", "pw1":"123123"}  

# drf serializer 
- write to db : dict -> ormObj -> db

```
serializer = Serializer(data={})
if serializer.is_valid():
    ormObj = serializer.save()
```

- read from db : db -> ormObj(s) -> dict or list[dict]

```
serializer = Serializer([{},{}], many=True)
serializer.data
```

- serializer override functions  
  validate, create