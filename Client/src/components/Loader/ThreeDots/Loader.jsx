import React from 'react'
import './Loader.css'

export default function Loader({ color }) {
  return (
    <span className={`ThreeDots-Loader ${color === 'white' && 'ThreeDots-Loader-White'}`}></span>
  )
}
