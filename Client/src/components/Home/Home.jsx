import React from 'react'
import './Home.css'
import Cards from './Cards/Cards'
import Navbar from '../Navbar/Navbar'


export default function Home() {
  return (
    <>
      <Navbar/>
      <div className='Home'>
        <Cards/>
      </div>
    </>
  )
}

