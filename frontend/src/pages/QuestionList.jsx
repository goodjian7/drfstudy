import React from "react";
import { useNavigate, Link } from "react-router-dom"
import classNames from "classnames";
import {rangeFromTo} from "../utils"
import { isTokenExpired, isLoggedIn } from "../utils/authAxios";
import moment from 'moment/min/moment-with-locales'
moment.locale("ko")

const QuestionList = ({questionList, pageIndex, displayCount, totalCount,})=>{    
    let minPageIndex = 0
    let maxPageIndex = Math.ceil(totalCount/displayCount)    
    const navigate = useNavigate()   
    const refreshToken = localStorage.getItem("refreshToken")
    let bRefreshTokenExpired = isTokenExpired(refreshToken)

    const onNewQuestionClick = async (e)=>{
        const bLoggedin = await isLoggedIn()
        if(bLoggedin){
            navigate("/question-create")
        }else{
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("accessToken")
            navigate("user/login")
        }
    }

    questionList = questionList || []    
    return (
        <>  
            <div className="container my-3">                
                <table className="table">
                    <thead>
                        <tr className="table-dark">
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            questionList.map((question, idx)=>{                        
                                return(
                                    <tr key={idx}>
                                        <td>{totalCount - (pageIndex * displayCount) - idx}</td>                            
                                        <td>
                                            <Link to={`/detail/${question.id}`}>{question.subject}</Link>                                            
                                            
                                            {
                                                question.answers.length > 0 &&
                                                <span className={classNames("text-danger small mx-2")}>
                                                    {question.answers.length}                                                
                                                </span>
                                            }
                                            
                                        </td>
                                        <td>{moment(question.create_date).format("YYYY년 MM월 DD일 hh:mm a")}</td>                                    
                                    </tr>                             
                                );
                            })        
                        }   
                    </tbody>
                </table>
                
                {/* 페이징 처리 시작 */}
                <ul className="pagination justify-content-center">
                    {/* 이전버튼 */}
                    <li className={classNames("page-item", {disabled:pageIndex<=minPageIndex})}>
                        <button 
                            className="page-link"
                            onClick={()=>{                                                               
                              navigate(`/?page=${pageIndex-1}`) 
                            }}
                        >
                            이전
                        </button>
                    </li>

                    {/* 페이지버튼 */}
                    {
                        rangeFromTo(-2,3,1).map((idx)=>{                            
                            let newPageIndex = pageIndex + idx
                            if(newPageIndex >= 0 && newPageIndex <= maxPageIndex){
                                return(
                                    <li key= {idx }className={classNames("page-item", {active:newPageIndex===pageIndex})}>
                                        <button
                                            className="page-link"
                                            onClick={()=>{
                                                navigate(`/?page=${newPageIndex}`)
                                            }}>
                                            {newPageIndex}
                                        </button>
                                    </li>
                                )
                            }
                        })

                    }                    
                    
                    {/* 다음버튼 */}
                    <li className={classNames("page-item", {disabled:pageIndex>=maxPageIndex})}>
                        <button 
                            className="page-link"
                            onClick={()=>{                                
                                navigate(`/?page=${pageIndex+1}`) 
                            }}
                        >
                            다음
                        </button>

                    </li>
                </ul>
                {/* 페이징 처리 끝 */}

                <div>                
                {                
                    <span className="btn btn-primary" onClick={onNewQuestionClick}>새 글 쓰기</span>                
                }
                </div>
            </div>                    
        </>
    );
}

export default QuestionList