import React, { useState } from 'react'
import './Navbar.css'
import SearchBar from './SearchBar/SearchBar'
import Options from './Options/Options'
import createImage from '../Images/createImage.png'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [isSomeActive, setIsSomeActive] = useState('')
  const navigate = useNavigate()
  return (
    <div className='Navbar'>
      <h1>VIDEOGAMES</h1>
      <div className='Navbar-Components'>
        <Options active={isSomeActive} setActive={setIsSomeActive}/>
        <SearchBar active={isSomeActive} setActive={setIsSomeActive}/>
        <button onClick={() => navigate('/create')} className='Navbar-Components-Create'><img src={createImage}/></button>
      </div>
    </div>
  )
}
