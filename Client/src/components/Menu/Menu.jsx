import React from 'react'
import './Menu.css'
import goBack from '../Images/goBackImage.png'
import logout from '../Images/logoutImage.png'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Menu({ access }) {
  const username = useSelector(state => state?.username)
  const navigate = useNavigate()
  const location = useLocation().pathname
  const handleLogout = () => {
    access(false)
    navigate('/')
  }
  const handleGoBack = () => {
    navigate(-1)
  }
  return (
    <div className='Menu'>
      <div className='Menu-Buttons'>     
        {location !== '/home' && <button onClick={handleGoBack} className='Menu-GoBack'><img src={goBack}/></button>}
        <button onClick={handleLogout} className='Menu-Logout'><img src={logout}/></button>
      </div>
      <label>{username}</label>
    </div>
  )
}
