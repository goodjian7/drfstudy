import axios from "axios"

// Axios 인스턴스 생성
const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// 토큰만료 검사함수
const isTokenExpired = (token) => {
    if (!token) return true;  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    const jwt = JSON.parse(jsonPayload);
    console.log("isTokenExpired")
    console.log(jwt)
    const exp = jwt.exp * 1000;
    return Date.now() > exp;
};

// 토큰 리프레쉬 함수
const refreshToken = async () => {
    try {
      const refresh = localStorage.getItem('refreshToken');
      const response = await authAxios.post('/api/common/token/refresh', {
        refresh,
      });
  
      const { access } = response.data;
      localStorage.setItem('accessToken', access);
      return access;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
}
  
// 인터셉터 설정
authAxios.interceptors.request.use(
    async (config) => {
        let accessToken = localStorage.getItem('accessToken');

        // 토큰 만료 확인 및 갱신
        if (isTokenExpired(accessToken)) {
            try {
                accessToken = await refreshToken();
            } 
            catch (error) {
                // 갱신 실패시                
                return Promise.reject(error);
            }
        }

        // 만료되지 않은 accessToken이 있으면 사용
        if (accessToken) {
        config.headers['Authorization'] = `Token ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default authAxios;