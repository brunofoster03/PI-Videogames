import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './Detail.css'
import { detailVideogame, setVideogames } from '../../redux/actions'
import Scroll from './Scroll/Scroll'
import Ratings from './Ratings/Ratings'
import Loader from '../Loader/Circle/Loader'
import axios from 'axios'

export default function Detail() {
  const { id } = useParams()
  const isDatabase = () => { 
    return id.includes('-')
  }
  const [isLoading, setIsLoading] = useState(true)
  const [backgroundLoading, setBackgroundLoading] = useState(true)
  const videogame = !isDatabase() ? useSelector(state => state?.detailGame) : useSelector(state => state?.videogames.find(game => game.id === id))
  const videogameImages = !isDatabase() ? useSelector(state => state?.videogames?.find(game => game.id === parseInt(id)).short_screenshots?.map(screenshot => screenshot.image)) : useSelector(state => state?.videogames?.find(game => game.id === id).images?.map(screenshot => screenshot));
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchVideogames = async () => {
      setIsLoading(true)
      try{
        !isDatabase() && await new Promise(resolve => resolve(dispatch(detailVideogame(id))))
      }
      catch(error){
        console.log(error)
      }
      finally{
        setIsLoading(false)
      }
    }
    fetchVideogames()
  },[id])
  const finishLoading = () => {
    setBackgroundLoading(false)
  }
  return (  
    <>
    <div className='Detail-Background'><img src={videogame?.background_image_additional} style={{display: `${backgroundLoading || isLoading ? 'none' : 'block'}`}} onLoad={() => finishLoading()}/></div>
    {isLoading || backgroundLoading ? (<div className='Detail-Loader'><Loader color='white'/></div>) : (
    <div className='Detail'>
      <div className='Detail-Content'>
        <h1>{videogame?.name}</h1>
        <h3 style={{color: 'white'}}>{videogame?.description_raw && videogame?.description_raw.split('\n\nEspañol\n')[0]}</h3>
      </div>
      <div className='Detail-Group'>
        <div className='Detail-Images'>
          <label>Screenshots</label>
        <Scroll images={videogameImages} sizex='460px' sizey='259px'/>
        </div>
        <div className='Detail-Information'>
          <div className='Detail-Information-Sub'>
            <label>Videogame ID</label>
            <label>{videogame?.id}</label>
          </div>
          <div className='Detail-Information-Sub'>
            <label>Available platforms</label>
            <div className='Detail-Information-Sub-Map'>{videogame?.platforms && videogame?.platforms.map((platform, index) => (<p key={index}>{platform.platform.name}</p>))}</div>
          </div>
          <div className='Detail-Information-Sub'>
            <label>Released date</label>
            <label>{videogame?.released}</label>
          </div>
          <div className='Detail-Information-Sub'>
            <label>Publisher</label>
            <label>{videogame?.publishers[0].name}</label>
          </div>
          <div className='Detail-Information-Sub'>
            <label>Genres</label>
            <div className='Detail-Information-Sub-Map'>{videogame?.genres && videogame?.genres.map((genre, index) => (<p key={index}>{genre.name}</p>))}</div>
          </div>
        </div>
        <div className='Detail-Rating'>
          <label className='Detail-Rating-Label'>Ratings</label>
          <Ratings game={videogame}/>
        </div>
      </div>
    </div>
    )}
    </>
  )
}
