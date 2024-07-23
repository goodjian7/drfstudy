import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import authAxios, { getUserIdFromToken } from "../utils/authAxios";
import moment from 'moment/min/moment-with-locales'
import { isNullOrEmptyOrSpace } from "../utils";
import { produce } from "immer";
import Markdown from "react-markdown"

moment.locale("ko")

const QuestionDetail = () => {
    let params = useParams()
    let question_id = params?.question_id
    const navigate = useNavigate()

    let [questionInfo, setQuestionInfo] = useState({})
    let [answerList, setAnswerList] = useState([])
    let [newAnswerContent, setNewAnswerContent] = useState("")
    let [errorMessage, setErrorMessage] = useState("")
    let [questionEditFormInfo, setQuestionEditFormInfo] = useState({visible:false,  subject:"", content:"",})
    let [answerEditFormInfo, setAnswerEditFormInfo] = useState({visible:false, content:"",})
    

    const getQuestionInfo = async ()=>{
        try{
            let endpoint = `/api/pybo/question/${question_id}/`            
            let response=await authAxios.get(endpoint)      
                        
            setQuestionInfo(response.data)        
            setAnswerList(response.data.answers)                
        }
        catch(error){
            console.log("error while getQuestionInfo")
        } 
    }      

    const onNewAnswerContentChanged = (e)=>{
        setNewAnswerContent(e.target.value)
    }

    const onAnswerAddClicked = async (e)=>{
        try{
            e.preventDefault()
            if(newAnswerContent.trim() === ""){
                setErrorMessage("공백은 사용할 수 없습니다.")
                return
            }                                    

            let requestBody = {
                content:newAnswerContent, 
                question:question_id,                
            }            
            
            let response = await authAxios.post("/api/pybo/answer/", requestBody)
                        
            await getQuestionInfo()
            setErrorMessage("")
            setNewAnswerContent("")                    
        }
        catch(error){
            if(error.response.status === 401){
                setErrorMessage("로그인후 사용해주세요")
            }
            else{
                setErrorMessage("답변등록 중 에러가 발생했습니다")
            }            
        }        
    }

    const onQuestionEditClicked = ()=>{
        setQuestionEditFormInfo({visible:true, subject:questionInfo.subject, content:questionInfo.content,})
    }

    const onQuestionEditFormChanged = (e)=>{                
        let newQuestionEditFormInfo = {...questionEditFormInfo}
        switch(e.target.id){
            case "questionEditSubject":
                newQuestionEditFormInfo.subject = e.target.value
                break
            case "questionEditContent":
                newQuestionEditFormInfo.content = e.target.value
                break
            default:
                break
        }
        setQuestionEditFormInfo(newQuestionEditFormInfo)        
    }

    const onQuestionEidtConfirmClicked = async (e)=>{
        e.preventDefault()
        try{            
            setQuestionEditFormInfo({visible:false, subject:"", content:"",})
            let respose = await authAxios.put(`/api/pybo/question/${question_id}/`, questionEditFormInfo)
            await getQuestionInfo()
        }
        catch(err){
            console.log("error : ")
            console.log(err)
        }
    }

    const onQuestionEditCancleClciked = (e)=>{
        e.preventDefault()
        setQuestionEditFormInfo({visible:false, subject:"", content:"",})
    }

    const onQuestionDeleteClicked = async ()=>{
        try{
            let response = await authAxios.delete(`/api/pybo/question/${question_id}/`)
            navigate("/?page=0")
        }catch(e){
            console.log("error : ")
            console.log(e)
        }
    }

    const onAnswerEditClicked = (e, answerContent)=>{
        setAnswerEditFormInfo({visible:true, contnet:answerContent})
    }

    const onAnswerEditFormChanged = (e)=>{        
        let newAnswerEditFormInfo = {...answerEditFormInfo}
        switch(e.target.id){            
            case "answerEditContent":
                newAnswerEditFormInfo.content = e.target.value
                break
            default:
                break
        }
        setAnswerEditFormInfo(newAnswerEditFormInfo)        
    }

    const onAnswerEditConfirmClicked =async (e, answer_id)=>{        
        e.preventDefault()
        try{            
            setAnswerEditFormInfo({visible:false, content:"",})
            let respose = await authAxios.put(`/api/pybo/answer/${answer_id}/`, {...answerEditFormInfo, question:question_id})
            await getQuestionInfo()
        }
        catch(err){
            console.log("error : ")
            console.log(err)
        }
    }

    const onAnswerEditCancleClicked = ()=>{
        setAnswerEditFormInfo({visible:false, contnet:""})
    }

    const onAnswerDeleteClicked =async(e, answer_id)=>{
        e.preventDefault()
        try{
            let response = await authAxios.delete(`/api/pybo/answer/${answer_id}/`)
            await getQuestionInfo()
        }catch(e){
            console.log("error : ")
            console.log(e)
        }
    }

    const onLikeQuestion = async ()=>{
        const refreshToken = localStorage.getItem("refreshToken")
        const userId = getUserIdFromToken(refreshToken)

        // 이미 추천한 경우
        if(questionInfo?.voters && questionInfo?.voters.some(ele=>ele.user===userId)){
            let questionVoteId = questionInfo.voters.find((value, index, obj)=>value.user === userId)
            questionVoteId = questionVoteId.id

            try{
                let response = await authAxios.delete(`/api/pybo/vote/question/${questionVoteId}`)
                await getQuestionInfo()

            }catch(e){
                console.log(e)
            }
        }
        // 추천하지 않은 경우
        else{            
            try{
                let response = await authAxios.post("/api/pybo/vote/question/", {question:question_id, user:userId})           
                await getQuestionInfo()
            }catch(e){
                console.log(e)
            }
        }
    }

    const onLikeAnswer = async (e, answerId)=>{
        let answerInfo = questionInfo.answers.find((value, index, obj)=> value?.id === answerId)                
        const refreshToken = localStorage.getItem("refreshToken")
        const userId = getUserIdFromToken(refreshToken)     
        
        // 이미 추천한 경우
        if(answerInfo?.voters && answerInfo.voters.some(ele=>ele.user===userId)){
            let answerVote = answerInfo.voters.find((value, index, obj)=>value.user===userId)
            let answerVoteId = answerVote.id
            try{
                let response = await authAxios.delete(`/api/pybo/vote/answer/${answerVoteId}`)
                await getQuestionInfo()
            }catch(err){
                console.log(err)
            }
        }
        // 추천하지 않은 경우
        else{
            try{
                let body = {answer:answerId, user:userId}                
                let response = await authAxios.post("/api/pybo/vote/answer/", body)           
                await getQuestionInfo()
            }catch(e){
                console.log(e)
            }
        }
    }

    useEffect(()=>{
        getQuestionInfo()                        
    },[])


    return (
        <>
            <div className="container">
                {/* 질문 */}
                <h1 className="border-bottom py-2">{questionInfo.subject}</h1>
                <div className="card my-3">
                    <div className="card-body">
                        <div className="card-text" style={{whiteSpace:"preLine"}}>
                            <Markdown>{questionInfo.content}</Markdown>
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="badge bg-light text-dark p-2">{questionInfo.username}</div>
                            <div className="badge bg-light text-dark p-2">
                                {moment(questionInfo.create_date).format("YYYY년 MM월 DD일 hh:mm a")}
                            </div>
                        </div>

                        {/* 질문수정UI */}
                        {
                            questionEditFormInfo.visible &&
                            <form>
                                <input 
                                    id="questionEditSubject"
                                    type="text" 
                                    className="form-control" 
                                    value={questionEditFormInfo.subject}
                                    onChange={onQuestionEditFormChanged}
                                    />
                                <textarea 
                                    id="questionEditContent"
                                    className="form-control" 
                                    rows="10" 
                                    value={questionEditFormInfo.content}
                                    onChange={onQuestionEditFormChanged}
                                    />
                                <div className="d-flex justify-content-end">
                                    <input                                         
                                        className="form-control btn btn-outline-primary" 
                                        type="button" 
                                        value="확인"
                                        onClick={onQuestionEidtConfirmClicked}                                        
                                        />
                                    <input                                         
                                        className="form-control btn btn-outline-secondary" 
                                        type="button" 
                                        value="취소"
                                        onClick={onQuestionEditCancleClciked}
                                        
                                        />
                                </div>
                            </form>                    
                        }      
                        <span className="d-flex justify-content-between">        
                            {/* 좋아요*/}
                            <span 
                                className="btn btn-outline-secondary"
                                onClick={onLikeQuestion}
                            >
                                좋아요 
                                {               
                                    questionInfo?.voters?.length > 0 && 
                                    <span className="badge bg-danger mx-1">{questionInfo.voters.length}</span>
                                }
                            </span>

                            {/* 수정&삭제 */}                        
                            <span>
                                <button className="btn btn-outline-primary" onClick={onQuestionEditClicked}>수정</button>
                                <button className="btn btn-outline-danger" onClick={onQuestionDeleteClicked}>삭제</button>
                            </span>
                        </span>
                    </div>                                        
                </div>

                
                
                {/* 답변목록 */}
                <div className="border-bottom my-3 py-2">
                    {answerList.length}개의 답변이 있습니다. 
                </div>         
                {
                    answerList.map((answer)=>{
                        return(                               
                            <div className="card my-3" key={answer.id}>
                                <div className="card-body">
                                    <div className="card-text" style={{whiteSpace:"preLine"}}>
                                        <Markdown>{answer.content}</Markdown>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <div className="badge bg-light text-dark p-2">{answer.username}</div>
                                        <div className="badge bg-light text-dark p-2">
                                            {moment(answer.create_date).format("YYYY년 MM월 DD일 hh:mm a")}
                                        </div>
                                    </div>
                                
                                    {/* 답변 수정 폼 */}
                                    {
                                        answerEditFormInfo.visible &&
                                        <form>                                        
                                            <textarea 
                                                id="answerEditContent"
                                                className="form-control" 
                                                rows="10" 
                                                value={answerEditFormInfo.content}
                                                onChange={onAnswerEditFormChanged}
                                                />
                                            <div className="d-flex justify-content-end">
                                                <input                                         
                                                    className="form-control btn btn-outline-primary" 
                                                    type="button" 
                                                    value="확인"
                                                    onClick={(e)=>onAnswerEditConfirmClicked(e,answer.id)}                                        
                                                    />
                                                <input                                         
                                                    className="form-control btn btn-outline-secondary" 
                                                    type="button" 
                                                    value="취소"
                                                    onClick={onAnswerEditCancleClicked}
                                                    
                                                    />
                                            </div>
                                        </form> 
                                    }

                                    <span className="d-flex justify-content-between"> 
                                        {/* 답변 좋아요*/}
                                        <span 
                                            className="btn btn-outline-secondary"
                                            onClick={(e)=>onLikeAnswer(e, answer.id)}
                                        >
                                            좋아요 
                                            {               
                                                answer?.voters?.length > 0 && 
                                                <span className="badge bg-danger mx-1">{answer.voters.length}</span>
                                            }
                                        </span>

                                        {/* 답변 수정삭제 */}
                                        <span className="d-flex justify-content-end">
                                            <button className="btn btn-outline-primary" onClick={(e)=>onAnswerEditClicked(e,answer.content)}>수정</button>
                                            <button className="btn btn-outline-danger" onClick={(e)=>onAnswerDeleteClicked(e, answer.id)}>삭제</button>
                                        </span>
                                    </span>
                                </div>
                            </div>                                                                                                              
                        )
                    })
                }

                

                {/* 답변등록 */}
                <div>{errorMessage}</div>
                <form className="my-3">
                    <textarea rows="10" style={{width:"100%"}} onChange={onNewAnswerContentChanged} value={newAnswerContent}/>
                    <div>
                    <input 
                        style={{width:"100%"}}
                        className="btn btn-primary"
                        type="submit" 
                        value="답변등록" 
                        onClick={onAnswerAddClicked} 
                    />
                    </div>
                </form>

            </div>
        </>
    );
};

export default QuestionDetail