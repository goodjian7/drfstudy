import { useState, useEffect } from "react"
import { Outlet, Link, useNavigate } from "react-router-dom"
import authAxios, { isTokenExpired, isLoggedIn } from "../utils/authAxios"

const Layout = ()=>{       
    const navigate = useNavigate()            
    const refreshToken = localStorage.getItem("refreshToken")
    let bRefreshTokenExpired = isTokenExpired(refreshToken)

    const onLogoutClicked = async (e)=>{
        try{
            let response = await authAxios.post("/api/common/token/expire/", {refreshToken})            
        }catch(e){
            
        }
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")       
        localStorage.removeItem("userName") 
        navigate("/")
    }
    
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Pybo</Link>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/user/create" style={{whiteSpace:"nowrap"}}>회원가입</Link>
                    </li>
                    <li className="nav-item">
                        
                        {
                            !bRefreshTokenExpired ? 
                            <Link className="nav-link" onClick={onLogoutClicked} style={{whiteSpace:"nowrap"}}>로그아웃</Link>                  
                            :<Link className="nav-link" to="/user/login" style={{whiteSpace:"nowrap"}}>로그인</Link>                                       
                        }
                    </li>
                </ul>
                </div>
            </nav>            
            <div>
                <Outlet/>
            </div>
        </>
    )
}

export default Layout