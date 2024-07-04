import { useState } from "react"
import { isNullOrEmptyOrSpace } from "../utils"
import { produce} from "immer"
import axios from "axios"


const QuestionCreate = ()=>{
    const apiUrl = import.meta.env.VITE_API_URL 
    let [errorMessage, setErrorMessage] = useState("")
    let [questionInfo, setQuestionInfo] = useState({subject:"", content:""})

    const onQuestionSubjectChanged = (e)=>{
        // let nextState = {...questionInfo, 
        //     subject:e.target.value
        // }        

        let nextState=produce(questionInfo, draft=>{
            draft.subject = e.target.value
        })
        setQuestionInfo(nextState)
    }

    const onQuestionContentChanged = (e)=>{
        let nextState = {...questionInfo, 
            content:e.target.value
        }        
        setQuestionInfo(nextState)        
    }
    
    const onQuestionAddClicked = (e)=>{
        e.preventDefault()
        if(isNullOrEmptyOrSpace(questionInfo.subject) ||
            isNullOrEmptyOrSpace(questionInfo.content)){
                setErrorMessage("공백은 허용되지 않습니다.")
                return
        }

        const sendCreateRequest = async()=>{
            let endpoint = apiUrl+`/api/pybo/question/`        
            let response = await axios.post(endpoint, questionInfo)   
            if(response.status!==204){
                setErrorMessage("서버에서 처리되지 않았습니다")
                return 
            }          
            else{
                setErrorMessage("등록됨")
                let newQuestionInfo=produce(questionInfo, (draft)=>{
                    draft.subject=""
                    draft.content=""
                })
                setQuestionInfo(newQuestionInfo)
            }
        }
        sendCreateRequest()
    }   

    return(
        <>
            <div className="container">
                <h5 className="my-3 border-bottom pb-2">
                    질문등록
                </h5>
                <div>{errorMessage}</div>                
                <form className="my-3">                    
                    <div className="mb-3">
                        <label>제목</label>                    
                        <input 
                            type="text" 
                            className="form-control" 
                            value={questionInfo.subject}
                            onChange={onQuestionSubjectChanged}
                            />
                    </div>
                    <div className="mb-3">
                        <label>내용</label>                    
                        <textarea 
                            rows="10" 
                            className="form-control" 
                            value={questionInfo.content}
                            onChange={onQuestionContentChanged}/>
                        <button className="btn btn-primary form-control my-3"
                            onClick={onQuestionAddClicked}>
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default QuestionCreate 