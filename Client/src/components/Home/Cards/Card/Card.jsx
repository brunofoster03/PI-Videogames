import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Card.css'
import detailImage from '../../../Images/detailImage.png'
import Loader from '../../../Loader/Circle/Loader'
import axios from 'axios'

export default function Card({ id, background, name, genres, onLoad }) {
  const [loadingImg, setLoadingImg] = useState(true)
  const navigate = useNavigate()
  return (
    <div className={`Card`}>
      <div className='Card-Detail' onClick={() => navigate(`/detail/${id}`)}>
        <label>Detail</label>
        <img src={detailImage}/>
      </div>
      <div className='Card-Image'><img style={{display: `${loadingImg ? 'none' : 'block'}`}} className='Card-Img' src={background} onLoad={() => setLoadingImg(false)}/>{loadingImg && (<Loader color='white'/>)}</div>
      <label className='Card-Name'>{name}</label>
      <div className='Card-Genres'>
        {genres && genres.map((genre, index) => (
        <p key={index}>{genre.name}</p>
        ))}
      </div>
    </div>
  )
}
