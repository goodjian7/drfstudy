import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import QuestionList from "./QuestionList";
import authAxios from "../utils/authAxios";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {    
    const dispatch = useDispatch()
    let userLoginState = useSelector((state)=>state.user)    

    const apiUrl = import.meta.env.VITE_API_URL
    const [searchParams, setSearchParams] = useSearchParams()    
    const pageIndex = Number(searchParams.get('page')) || 0       
    const searchWord = searchParams.get('search') || ""     
    
    let [displayCount, setDisplayCount] = useState(10)    
    let [questionListInfo, setQuestionListInfo] = useState({
        questionList:[],
        totalCount:0,        
    })        
    
    const getQuestionList = async ()=>{
        try{                      
            let apiEndpoint = `/api/pybo/question/?offset=${pageIndex*displayCount}&limit=${displayCount}&subject__icontains=${searchWord}`            
            let response = await authAxios.get(apiEndpoint)                  
            let newQuestionListInfo = {questionList:response.data.results, totalCount:Number(response.data.count)}                        
            setQuestionListInfo(newQuestionListInfo)           
        }
        catch(error){
            console.log("getQuestionList error")
        }
    }

    useEffect(()=>{        
        getQuestionList()
    },[pageIndex, displayCount, searchWord])

    return (
        <>
        <QuestionList             
            questionList={questionListInfo.questionList}
            pageIndex={pageIndex}
            totalCount={questionListInfo.totalCount}
            displayCount={displayCount}
            searchWord={searchWord}
        />        
        </>
    )
};

export default Home