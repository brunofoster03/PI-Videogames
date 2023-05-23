import React from 'react'
import './Email.css'

export default function Email({ pop, error: { symbol, domain, starts, valids } }) {
  return (
    <div className={`ErrorNote-Email ${pop ? 'ErrorNote-Email-Animation' : ''}`}>
      <p>Your email should meet the following requirements:</p>
      <ul>
        <li className={symbol ? 'ErrorNote-Email-Valid' : ''}>The email address must contain an "@" symbol after at least one character and before at least two characters.</li>
        <li className={domain ? 'ErrorNote-Email-Valid' : ''}>The email address must contain at least one character after the "@" symbol and before the last dot.</li>
        <li className={starts ? 'ErrorNote-Email-Valid' : ''}>The email address must not start or end with a dot or contain consecutive dots.</li>
        <li className={valids ? 'ErrorNote-Email-Valid' : ''}>The email must not contain unauthorized characters in an email.</li>
      </ul>
    </div>
  )
}