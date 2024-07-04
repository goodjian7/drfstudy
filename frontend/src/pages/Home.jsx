import { useState, useEffect } from "react";
import axios from "axios";
//import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
// import classNames from "classnames";
// import { produce } from "immer";
// import { rangeFromTo } from "../utils";
// import QuestionCreate from "./QuestionCreate";
import QuestionList from "./QuestionList";

const Home = () => {    
    const apiUrl = import.meta.env.VITE_API_URL
    const [searchParams, setSearchParams] = useSearchParams()    
    const pageIndex = Number(searchParams.get('page')) || 0         
    console.log("Home rednered, pageIndex : " + pageIndex)

    let [displayCount, setDisplayCount] = useState(10)    
    let [questionListInfo, setQuestionListInfo] = useState({
        questionList:[],
        totalCount:0,        
    })        
    
    const getQuestionList = async ()=>{
        try{            
            let response = await axios.get(apiUrl+`/api/pybo/question/?offset=${pageIndex*displayCount}&limit=${displayCount}`)                                    
            let newQuestionListInfo = {questionList:response.data.results, totalCount:Number(response.data.count)}                        
            setQuestionListInfo(newQuestionListInfo)
            console.log("getQuestionList called")
            console.log(response.data)

        }
        catch(error){
            console.log("getQuestionList error")
        }
    }

    useEffect(()=>{
        console.log("effect from Home")
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