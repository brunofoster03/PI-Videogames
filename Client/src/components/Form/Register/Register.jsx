import React, { useEffect, useState } from 'react'
import './Register.css'
import { validate } from '../Validations'
import errorForm from '../../Images/errorForm.png'
import userAvailable from '../../Images/UserFound.png'
import userNotAvailable from '../../Images/UserNotFound.png'
import UsernameError from './ErrorNote/Username/Username'
import EmailError from './ErrorNote/Email/Email'
import PasswordError from './ErrorNote/Password/Password'
import axios from 'axios'

export default function Register({ change, clicked, sign, register }) {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [validations, setValidations] = useState({
    username: {
      length: false,
      valids: false,
      starts: false,
      consecutive: false
    },
    email: {
      symbol: false,
      domain: false,
      starts: false,
      valids: false
    },
    password: {
      lowerUpper: false,
      number: false,
      special: false,
      length: false
    }
  })
  useEffect(() => {
    setData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
  },[sign])
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value.trim()
    })
  }
  useEffect(() => {
    setValidations(validate(data))
  },[data])
  const [popError, setPopError] = useState({
    username: false,
    email: false,
    password: false
  })
  const handleSubmit = async (event) => {
    event.preventDefault()
    await register(data)
  }
  const [available, setAvailable] = useState('null')
  const usernameRegex = new RegExp('^(?=.{2,30}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')
  const searchAvailable = async () => {
    const ENDPOINT = 'http://localhost:3001/user/' + data.username
    if (data.username === '') {
      setAvailable('null')
      return
    }
    if (!usernameRegex.test(data.username)) {
      setAvailable('null')
      return
    }
    try {
      const { data: { found } } = await axios(ENDPOINT);
      if (found) {
        setAvailable('false')
      }
      else {
        setAvailable('true')
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    searchAvailable()
  },[data.username])
  return (
    <div className={`Form-Register ${clicked ? (change === 'left' ? 'Form-Register-Right' : 'Form-Register-Left') : ''}`}>
      <div className='Form-Register-Form'>
        <h1>Register</h1>
        <UsernameError pop={popError.username} error={validations.username}/>
        <EmailError pop={popError.email} error={validations.email}/>
        <PasswordError pop={popError.password} error={validations.password}/>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <img onMouseOver={() => setPopError({...popError, username: true})} onMouseLeave={() => setPopError({...popError, username: false})} className={`Form-ErrorImage ${!(Object.values(validations.username).every(value => value === true)) && data.username ? 'Form-ErrorImage-Animation' : ''}`} src={errorForm}/>
            <input className={data.username && !(Object.values(validations.username).every(value => value === true)) ? 'Form-Register-Form-Invalid' : ''} autoComplete='off' onChange={handleChange} type='text' name='username' value={data.username} placeholder='username'/>
            <div className='Form-Username-Check'><img title='Username available' className={available === 'true' && (available !== 'null' || available !== 'null') ? 'Form-Username-Checked-Visible' : 'Form-Username-Checked-Hidden'} src={userAvailable}/><img title='Username already in use' className={available === 'false' && (available !== 'null' || available !== 'null') ? 'Form-Username-Checked-Visible' : 'Form-Username-Checked-Hidden'} src={userNotAvailable}/></div>
          </div>
          <div>
            <label>Email</label>
            <img onMouseOver={() => setPopError({...popError, email: true})} onMouseLeave={() => setPopError({...popError, email: false})} className={`Form-ErrorImage ${!(Object.values(validations.email).every(value => value === true)) && data.email ? 'Form-ErrorImage-Animation' : ''}`} src={errorForm}/>
            <input className={data.email && !(Object.values(validations.email).every(value => value === true)) ? 'Form-Register-Form-Invalid' : ''} autoComplete='off' onChange={handleChange} type='mail' name='email' value={data.email} placeholder='email'/>
          </div>
          <div>
            <label>Password</label>

            <img onMouseOver={() => setPopError({...popError, password: true})} onMouseLeave={() => setPopError({...popError, password: false})} className={`Form-ErrorImage ${!(Object.values(validations.password).every(value => value === true)) && data.password ? 'Form-ErrorImage-Animation' : ''}`} src={errorForm}/>
            <input className={data.password && !(Object.values(validations.password).every(value => value === true)) ? 'Form-Register-Form-Invalid' : ''} autoComplete='off' onChange={handleChange} type='password' name='password' value={data.password} placeholder='password'/>
            <input className={data.confirmPassword && data.confirmPassword !== data.password ? 'Form-Register-Form-Invalid' : ''} autoComplete='off' onChange={handleChange} type='password' name='confirmPassword' value={data.confirmPassword} placeholder='confirm password'/>
          </div>
          <button disabled={((Object.values(validations.username).some(value => value === false)) || (Object.values(validations.email).some(value => value === false)) || (Object.values(validations.password).some(value => value === false))) || available === 'false'} type='submit' className={`Form-Register-Form-Button ${(Object.values(validations.username).some(value => value === false)) || (Object.values(validations.email).some(value => value === false)) || (Object.values(validations.password).some(value => value === false)) || data.password !== data.confirmPassword || available === 'false' ? 'Form-Register-Form-Button-Disabled' : ''}`}>Sign Up</button>
        </form>
      </div>
    </div>
  )
}
