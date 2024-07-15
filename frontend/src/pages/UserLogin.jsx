import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import authAxios from "../utils/authAxios"

const UserLogin=()=>{
    const apiUrl = import.meta.env.VITE_API_URL 
    const navigate = useNavigate()
    let [errorMessages, setErrorMessages] = useState([])
    let [credential, setCredential] = useState({username:"", password:""})
    
    const onSubmit = async (e)=>{
        e.preventDefault()
        try{
            let response = await authAxios.post("/api/common/token/issue/", credential)
            const {access, refresh} = response.data 
            localStorage.setItem('accessToken', access)
            localStorage.setItem('refreshToken', refresh)
            localStorage.setItem('userName', credential.username)          
            navigate("/")
        }catch(e){
            console.log(e)
            setErrorMessages(["잘못된 정보를 입력했습니다."])
        }        
    }

    const onInputChanged = (e)=>{
        setCredential({...credential, [e.target.id]:e.target.value})
    }

    return(
        <>
            <div className="container my-1">
                <h5 className="text-center">로그인</h5>
                <form className="form">
                    <div>아이디</div>
                    <input 
                        id="username"
                        className="form-control"
                        type="text"                       
                        value={credential.username} 
                        onChange={onInputChanged}
                    />
                    
                    <div>암호</div>                    
                    <input 
                        id = "password"
                        className="form-control"
                        type="password"
                        value={credential.password}
                        onChange={onInputChanged}
                    />       

                    {
                    (errorMessages.length > 0) &&
                        errorMessages.map((em, idx)=>{
                            if(em !==""){
                                return(
                                    <div key={idx} className="alert alert-danger m-1">
                                        {em}
                                    </div>
                                )
                            }
                            return(
                                <></>
                            )
                        })                        
                    }          
                    
                    <div className="my-1">
                    <input 
                        className="form-control btn btn-primary"
                        type="submit"                        
                        value="로그인"
                        onClick={onSubmit}
                    />
                    </div>
                </form>                
            </div>
        </>
    )
}

export default UserLogin