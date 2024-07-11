import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const UserCreate = ()=>{
    const apiUrl = import.meta.env.VITE_API_URL 
    let navigate = useNavigate()
    let [userInfo, setUserInfo] = useState({
        username:"", pw0:"", pw1:"",
    })
    let [errorMessages, setErrorMessages] = useState([])
    
    const createNewUser = async()=>{        
        let postEndpoint = apiUrl + "/api/common/register/"
        try{
            let response = await axios.post(postEndpoint, userInfo)            
            if(response.status === 201){
                navigate("/")
            }            
        }
        catch(e){            
            let newErrorMessages = []
            for (const key in e.response.data.error) {                
                let strError = `${key} : ` + e.response.data.error[key][0]
                newErrorMessages.push(strError)

            }            
            setErrorMessages(newErrorMessages)            
        }        
    }

    const onSubmit = (e)=>{                
        e.preventDefault()
        createNewUser()
    }

    const onUserInfoChanged = (e)=>{
        switch(e.target.id){
            case "username":
                setUserInfo({...userInfo, username:e.target.value})
                break

            case "pw0":
                setUserInfo({...userInfo, pw0:e.target.value})
                break

            case "pw1":
                setUserInfo({...userInfo, pw1:e.target.value})
                break

            default:
                break
        }
    }

    return(
        <>
        <div className="container">            
            <h5 className="text-center">회원가입</h5>
            <form className="mb-3">
                <div>
                    <div>사용자 이름</div>
                    <input 
                        id="username"
                        type="text" 
                        className="form-control" 
                        onChange={onUserInfoChanged}
                        value={userInfo.username}>                 
                    </input>                    
                </div>
                <div>
                    <div>비밀번호</div>
                    <input 
                        id="pw0"
                        type="password" 
                        className="form-control" 
                        onChange={onUserInfoChanged}
                        value={userInfo.pw0}>                 
                    </input>                    
                </div>
                <div>
                    <div>비밀번호 확인</div>
                    <input 
                        id="pw1"
                        type="password" 
                        className="form-control" 
                        onChange={onUserInfoChanged}
                        value={userInfo.pw1}>                 
                    </input>
                </div>      
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
                <div>
                    <input
                        type="submit"
                        className="form-control btn btn-primary m-1"
                        onClick={onSubmit}
                        value="등록"
                        >                        
                    </input>
                </div>   
            </form>
        </div>
        </>
    )
}

export default UserCreate