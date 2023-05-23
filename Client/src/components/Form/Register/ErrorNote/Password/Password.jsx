import React from 'react'
import './Password.css'

export default function Password({ pop, error: { lowerUpper, number, special, length } }) {
  return (
    <div className={`ErrorNote-Password ${pop ? 'ErrorNote-Password-Animation' : ''}`}>
      <p>Your password should meet the following requirements:</p>
      <ul>
        <li className={lowerUpper ? 'ErrorNote-Password-Valid' : ''}>The password must contain at least one lowercase and uppercase letter.</li>
        <li className={number ? 'ErrorNote-Password-Valid' : ''}>The password must contain at least one number.</li>
        <li className={special ? 'ErrorNote-Password-Valid' : ''}>The password may contain optional special characters [ . ! @ # $ % & ? ~ _ ñ Ñ ]</li>
        <li className={length ? 'ErrorNote-Password-Valid' : ''}>The password must have a minimum length of 6 characters and a maximum length of 32 characters.</li>
      </ul>
    </div>
  )
}