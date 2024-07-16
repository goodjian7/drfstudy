import axios from "axios"

// Axios 인스턴스 생성
const authAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

const isLoggedIn = async ()=>{
    let refreshToken = localStorage.getItem("refreshToken")
    if(!refreshToken){
        return false
    }
    try{        
        let response = await axios.post(import.meta.env.VITE_API_URL+`/api/common/token/verify/`,{token:refreshToken})
        if(response.status===200)
            return true
    }catch(e){
        return false
    }
    return true
}

// 토큰만료 검사함수
const isTokenExpired = (token) => {
    if (!token) return true;  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    const jwt = JSON.parse(jsonPayload);
    
    const exp = jwt.exp * 1000;  
    const bExpired = Date.now() > exp      
    return bExpired;
};

// 토큰 리프레쉬 함수
const refreshToken = async () => {
    try {
      const apiSvr = import.meta.env.VITE_API_URL        
      const refreshToken = localStorage.getItem('refreshToken');
      const apiEndpoint = apiSvr + '/api/common/token/refresh/'            
      const response = await axios.post(apiEndpoint, {refresh:refreshToken})     
          
      const { access, refresh} = response.data;      
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)     

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
        
        // 로컬스토리지에 access토큰이 비어 있으면 로그아웃상태 헤더를 추가하지 않고 사용
        if( !accessToken ){            
            return config
        }

        // accessToken이 있지만 만료되었다면. accessToken갱신
        if (isTokenExpired(accessToken)) {
            try {
                console.log("accessToken exist in localStorage but is expired")
                accessToken = await refreshToken();
            } 
            catch (error) {
                // 갱신 실패시 로컬스토리지의 토큰을 제거하고 auth옵션을 사용하지 않는다.           
                localStorage.removeItem("accessToken")     
                localStorage.removeItem("refreshToken")
                //localStorage.removeItem("userName")
                return config
            }
        }

        // accessToken을 헤더에 넣어 사용
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
export {isTokenExpired, isLoggedIn} 