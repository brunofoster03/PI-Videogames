import React from 'react'
import './errorPage.css'
import { useNavigate } from 'react-router-dom'

export default function errorPage() {
  const navigate = useNavigate()
  return (
    <div className='errorPage'>
      <h1>404</h1>
      <h3>Oops, the page you are looking for does not exist.</h3>
      <p>You may want to head back to the homepage... no?</p>
      <button onClick={() => navigate('/home')}>Go home</button>
    </div>
  )
}
