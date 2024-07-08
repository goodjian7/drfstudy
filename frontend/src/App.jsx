import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import QuestionDetail from './pages/QuestionDetail'
import QuestionCreate from './pages/QuestionCreate'
import Layout from './pages/Layout'
import UserCreate from "./pages/UserCreate"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="detail/:question_id" element={<QuestionDetail/>}/>
        <Route path="question-create" element={<QuestionCreate/>}/>
        <Route path="user/create" element={<UserCreate/>}/>
      </Route>
    </Routes>      
  )
}

export default App
