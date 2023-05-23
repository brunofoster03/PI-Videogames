import React from 'react'
import './Username.css'

export default function Username({ pop, error: { length, valids, starts, consecutive } }) {
  return (
    <div className={`ErrorNote-Username ${pop ? 'ErrorNote-Username-Animation' : ''}`}>
      <p>Your username should meet the following requirements:</p>
      <ul>
        <li className={length ? 'ErrorNote-Username-Valid' : ''}>The username must be between 2 and 30 characters long.</li>
        <li className={valids ? 'ErrorNote-Username-Valid' : ''}>The username can only contain letters, numbers, dots, and underscores.</li>
        <li className={starts ? 'ErrorNote-Username-Valid' : ''}>The username cannot begin or end with a dot or underscore.</li>
        <li className={consecutive ? 'ErrorNote-Username-Valid' : ''}>The username cannot contain consecutive dots or underscores.</li>
      </ul>
    </div>
  )
}
