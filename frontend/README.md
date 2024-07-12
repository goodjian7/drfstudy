# what's done
- /src/pages/QuestionList.jsx에서 글쓰기 버튼을 누를 때, refreshToken검사  
  /api/common/token/verify 엔드포인트로 refreshToken유효성을 검사함
- refreshToken유효성 검사결과에 따라 로그인페이지로 리다이렉팅
- 글로벌 state를 쓸 수 있도록 @reduxjs/toolkit을 추가해 놓음.  
  npm install @reduxjs/toolkit react-redux