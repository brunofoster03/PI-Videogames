import React from 'react'
import './Landing.css'
import Form from '../Form/Form'

export default function Landing({ register, login }) {
  return (
    <div className='Landing'>
      <Form register={register} login={login}/>
    </div>
  )
}
