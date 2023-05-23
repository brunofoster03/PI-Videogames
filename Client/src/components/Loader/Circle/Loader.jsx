import React from 'react'
import './Loader.css'

export default function Loader({ color }) {
  return (
    <span className={`Circle-Loader ${color === 'white' && 'Circle-Loader-White'}`}></span>
  )
}
