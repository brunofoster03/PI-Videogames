import './App.css'
import { Routes, Route, useNavigation, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Detail from './components/Detail/Detail'
import Create from './components/Create/Create'
import Menu from './components/Menu/Menu'
import ErrorPage from './components/errorPage/errorPage'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { setVideogames, setUsername } from './redux/actions'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation().pathname
  // const [access, setAccess] = useState(false)
  const [access, setAccess] = useState(localStorage.getItem('access') === 'true')
  const [theme, setTheme] = useState('dark')
  const getVideogames = async () => {
    try{
      dispatch(setVideogames())
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    getVideogames()
  },[])
  const register = async (userData) => {
    const { username, email, password } = userData
    const ENDPOINT = 'http://localhost:3001/user/create'
    try{
      const { data: { access } } = await axios.post(ENDPOINT, {
        username,
        email,
        password
      })
      setAccess(access)
      access && dispatch(setUsername(username))
      access && navigate('/home')
    }
    catch(error){
      console.log(error)
    }
  }
  const login = async (userData) => {
    const { username, password } = userData
    const ENDPOINT = 'http://localhost:3001/user/auth'
    try{
      const { data: { access }} = await axios.post(ENDPOINT, {
        username,
        password
      })
      if(!access) return true
      setAccess(access)
      access && dispatch(setUsername(username))
      access && navigate('/home')
      return false
    }
    catch(error){
      console.log(error)
    }
  }
  useEffect(() => {
    localStorage.setItem('access', access)
    !access && navigate('/');
 }, [access]);
  return (
    <>
      {location !== '/' && <Menu access={setAccess}/>}
      <Routes>
        <Route path='/' element={<Landing register={register} login={login}/>} />
        <Route path='/home' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
  )
}

export default App
