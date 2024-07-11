import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import QuestionList from "./QuestionList";
import authAxios from "../utils/authAxios";

const Home = () => {    
    const apiUrl = import.meta.env.VITE_API_URL
    const [searchParams, setSearchParams] = useSearchParams()    
    const pageIndex = Number(searchParams.get('page')) || 0             

    let [displayCount, setDisplayCount] = useState(10)    
    let [questionListInfo, setQuestionListInfo] = useState({
        questionList:[],
        totalCount:0,        
    })        
    
    const getQuestionList = async ()=>{
        try{                      
            //let response = await authAxios.get(`/api/pybo/question/?offset=${pageIndex*displayCount}&limit=${displayCount}`)      
            let apiSvr = import.meta.env.VITE_API_URL                              
            let response = await axios.get(apiSvr+`/api/pybo/question/?offset=${pageIndex*displayCount}&limit=${displayCount}`)

            let newQuestionListInfo = {questionList:response.data.results, totalCount:Number(response.data.count)}                        
            setQuestionListInfo(newQuestionListInfo)           
        }
        catch(error){
            console.log("getQuestionList error")
        }
    }

    useEffect(()=>{        
        getQuestionList()
    },[pageIndex, displayCount])

    return (
        <>
        <QuestionList             
            questionList={questionListInfo.questionList}
            pageIndex={pageIndex}
            totalCount={questionListInfo.totalCount}
            displayCount={displayCount}
        />
        </>
    )
};

export default Home