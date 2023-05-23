import React, { useState, useEffect } from 'react'
import './Form.css'
import Login from './Login/Login'
import Register from './Register/Register'
import rotationBackground from '../Images/formBackground2.jpg'

export default function Form({ register, login }) {
  const [option, setOption] = useState('right')
  const [clicked, setClicked] = useState(false)
  useEffect(() => {
    return setClicked(false)
  },[])
  const changeForm = () => {
    option === 'left' ? setOption('right') : setOption('left')
    setClicked(true)
  }
  const [sign, setSign] = useState(false)
  const signChange = () => {
    setSign(!sign)
  }
  return (
    <>
      <div className='Form'>
        <div className={`Form-Rotation ${clicked ? (option === 'left' ? 'Form-Rotation-Right' : 'Form-Rotation-Left') : ''}`}>
          <div className='Form-Rotation-Info'>
            <h1>Videogames</h1>
            <span><p className={clicked ? (option === 'left' ? 'Form-Rotation-Info-Register-Right' : 'Form-Rotation-Info-Register-Left') : 'Form-Mount'}>Enter a world of endless possibilities and explore the vast selection of video games that our website has to offer. Join us now and embark on a journey of adventure and excitement!</p><p className={clicked ? (option === 'left' ? 'Form-Rotation-Info-Login-Right' : 'Form-Rotation-Info-Login-Left') : ''}>Welcome back! Log in now and discover a world of over 100 games at your fingertips. Join our community and start creating your own games!</p></span>
            <div className={`Form-ChangeSign ${clicked ? (option === 'left' ? 'Form-ChangeSign-Left' : 'Form-ChangeSign-Right') : ''}`}>
              <label>{option === 'right' ? 'Don\'t have an account?' : 'Already have an account?'}</label>
              <button className={option === 'left' ? 'Form-ChangeSign-Button-SignIn' : 'Form-ChangeSign-Button-SignUp'} onClick={() => {changeForm(); signChange()}}><strong>Sign <span>{option === 'left' ? 'In' : 'Up'}</span></strong></button>
            </div>
          </div>
          <img className={`Form-Image ${clicked ? (option === 'left' ? 'Form-Image-Right' : 'Form-Image-Left') : ''}`} src={rotationBackground}/>
        </div>
        <Login change={option} clicked={clicked} sign={sign} login={login}/>
        <Register change={option} clicked={clicked} sign={sign} register={register}/>
      </div>
    </>
  )
}
