import React, { useEffect, useState } from 'react'
import './Login.css'
import seePassword from '../../Images/seePassword.png'
import notseePassword from '../../Images/notseePassword.png'

export default function Login({ change, clicked, sign, login }) {
  const [typePassword, setTypePassword] = useState('password')
  const changeTypePassword = (event) => {
    event.preventDefault()
    typePassword === 'password' ? setTypePassword('text') : setTypePassword('password')
  }
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  useEffect(() => {
    setData({
      username: '',
      password: ''
    })
    setError(null)
  },[sign])
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const [error, setError] = useState(null)
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await login(data)
    setError(response)
  }
  useEffect(() => {
    setError(null)
  },[data])
  return (
    <div className={`Form-Login ${clicked ? (change === 'left' ? 'Form-Login-Left' : 'Form-Login-Right') : ''}`}>
          <div className='Form-Login-Form'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username</label>
                <input onChange={handleChange} type='text' name='username' value={data.username} placeholder='username'/>
              </div>
              <div>
                <label>Password</label>
                <input onChange={handleChange} type={typePassword} name='password' value={data.password} placeholder='password'/>
                <button type='button' className='Form-Login-Form-TypePassword' onClick={changeTypePassword}><img src={typePassword === 'password' ? notseePassword : seePassword}/></button>
              </div>
              <button type='submit' disabled={!data.username || !data.password} className={`Form-Login-Form-Button ${!data.username || !data.password ? 'Form-Login-Form-Button-Disabled' : ''}`}>Sign In</button>
            </form>
            <p className={!(error === null) ? (error ? 'Form-Login-Form-Error' : 'Form-Login-Form-ErrorHidden') : null}>Incorrect username or password</p>
          </div>
        </div>
  )
}
