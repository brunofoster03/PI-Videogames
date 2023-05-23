import React, { useEffect, useState } from 'react'
import './Create.css'
import Scroll from '../Detail/Scroll/Scroll'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { nameValidate, descriptionValidate, imagesValidate, platformsValidate, ratingValidate, genresValidate } from './Validations'

export default function Create() {
  const date = new Date()
  const thisDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
  const username = useSelector(state => state?.username)
  const [platforms, setPlatforms] = useState([])
  const [genres, setGenres] = useState([])
  useEffect(() => {
    const PLATFORMS_ENDPOINT = 'http://localhost:3001/platforms'
    const GENRES_ENDPOINT = 'http://localhost:3001/genres'
    const getPlatforms = async () => {
      try{
        const { data } = await axios(PLATFORMS_ENDPOINT)
        setPlatforms(data)
      }
      catch(error){
        console.log(error)
      }
    }
    const getGenres = async () => {
      try{
        const { data } = await axios(GENRES_ENDPOINT)
        setGenres(data)
      }
      catch(error){
        console.log(error)
      }
    }
    getPlatforms()
    getGenres()
  },[])
  const [rating, setRating] = useState(0)
  const [data, setData] = useState({
    name: '',
    description: '',
    released: thisDate,
    image: '',
    platform: '',
    rating: rating,
    exceptional: '',
    exceptionalpercent: 0,
    recommended: '',
    recommendedpercent: 0,
    meh: '',
    mehpercent: 0,
    skip: '',
    skippercent: 0
  })
  const [errors, setErrors] = useState({
    name: true,
    description: true,
    images: true,
    platforms: true,
    genres: true,
    rating: true,
  })
  useEffect(() => {
    const exceptional = parseInt(data.exceptional) || 0
    const recommended = parseInt(data.recommended) || 0
    const meh = parseInt(data.meh) || 0
    const skip = parseInt(data.skip) || 0
    const votes = exceptional + recommended + meh + skip
    const exceptionalpercent = ((exceptional / votes) * 100).toFixed(2)
    const recommendedpercent = ((recommended / votes) * 100).toFixed(2)
    const mehpercent = ((meh / votes) * 100).toFixed(2)
    const skippercent = ((skip / votes) * 100).toFixed(2)
    let value = (((exceptional * 5) + (data.recommended * 4) + (meh * 3) + (skip * 1)) / votes).toFixed(2)
    value = isNaN(value) ? 0 : value
    setRating(value)
    setData({
      ...data,
      rating: value,
      exceptionalpercent,
      recommendedpercent,
      mehpercent,
      skippercent
    })
  },[data.exceptional, data.recommended, data.meh, data.skip])
  const handleChange = (event) => {
    if(['exceptional', 'recommended', 'meh', 'skip'].includes(event.target.name)){
      if(/^\d*$/.test(event.target.value)){
        setData({
          ...data,
          [event.target.name]: event.target.value
        })
      }
    }else{
      setData({
        ...data,
        [event.target.name]: event.target.value
      })
    }
  }
  const [arrayData, setArrayData] = useState({
    images: [],
    platforms: [],
    genres: []
  })
  const [validImage, setValidImage] = useState(true)
  const setNewImage = () => {
    const image = new Image()
    const imageUrl = data.image
    image.src = imageUrl

    image.onload = () => {
      setArrayData({
        ...arrayData,
        images: [...arrayData.images, imageUrl]
      })
      setData({
        ...data,
        image: ''
      })
    }
    image.onerror = () => {
      setValidImage(false)
      setTimeout(() => {
        setValidImage(true)
      }, 500);
    }
  }
  const selectPlatform = (event) => {
    const newPlatform = event.target.textContent
    setArrayData({
      ...arrayData,
      platforms: (arrayData.platforms.some(platform => platform.platform.name === newPlatform) ? (arrayData.platforms.filter(platform => platform.platform.name !== newPlatform)) : [...arrayData.platforms, {platform: {name: newPlatform}}])
    })
  }
  const selectGenre = (event) => {
    const newGenre = event.target.textContent
    setArrayData({
      ...arrayData,
      genres: (arrayData.genres.some(genre => genre.name === newGenre) ? (arrayData.genres.filter(genre => genre.name !== newGenre)) : [...arrayData.genres, {name: newGenre}])
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const ENDPOINT = 'http://localhost:3001/videogames'
    try{
      await axios.post(ENDPOINT, {
        name: data.name,
        description: data.description,
        images: arrayData.images,
        released: data.released,
        platforms: arrayData.platforms,
        rating: data.rating,
        ratings: [
          {
            id: 5,
            title: 'exceptional',
            count: data.exceptional,
            percent: data.exceptionalpercent
          },
          {
            id: 4,
            title: 'recommended',
            count: data.recommended,
            percent: data.recommendedpercent
          },
          {
            id: 3,
            title: 'meh',
            count: data.meh,
            percent: data.mehpercent
          },
          {
            id: 1,
            title: 'skip',
            count: data.skip,
            percent: data.skippercent
          }
        ],
        genres: arrayData.genres,
        publishers: [{name: username}]
      })
    }
    catch(error){
      console.log(error)
    }
    
  }
  useEffect(() => {
    const nameError = nameValidate(data.name)
    const descriptionError = descriptionValidate(data.description)
    const imagesError = imagesValidate(arrayData.images)
    const platformsError = platformsValidate(arrayData.platforms)
    const genresError = genresValidate(arrayData.genres)
    const ratingError = ratingValidate(data.rating)
    setErrors({
      name: nameError,
      description: descriptionError,
      images: imagesError,
      platforms: platformsError,
      genres: genresError,
      rating: ratingError

    })
  },[data, arrayData])
  return (
    <div className='Create'>
      <h1>CREATE A GAME</h1>
      <form onSubmit={handleSubmit}>
        <div className='Create-Form'>
          <div className='Create-Group-1'>
            <div className='Create-Name'>
              <label>Game name</label>
              <input style={errors.name && data.name ? {outline: '3px solid red'} : null} autoComplete='off' onChange={handleChange} value={data.name} name='name' type='text'/>
              <div className={`Create-Name-Error ${!errors.name ? 'Create-NoError' : ''}`}>
                <ul>
                  <li>Must have between 3 and 32 characters</li>
                  <li>Can only contain letters, numbers, and [ - ( ) ' . ]</li>
                </ul>
              </div>
            </div>
            <div className='Create-Description'>
              <label>Description</label>
              <textarea style={errors.description && data.description ? {outline: '3px solid red'} : null} onChange={handleChange} value={data.description} name='description' type='text'/>
              <div className={`Create-Description-Error ${!errors.description ? 'Create-NoError' : ''}`}>
                <ul>
                  <li>Must have between 20 and 255 characters</li>
                </ul>
              </div>
            </div>
            <div className='Create-Released'>
              <label>Released</label>
              <label>{thisDate}</label>
            </div>
          </div>
          <div className='Create-Images'>
            <label>Images</label>
            <input style={errors.images && arrayData.images.length >= 1 ? {outline: '3px solid red'} : null} autoComplete='off' onChange={handleChange} name='image' value={data.image} type='text' placeholder='Insert image URL'/>
            <div className={`Create-Images-Error ${!errors.images ? 'Create-NoError' : ''}`}>
                <ul>
                  <li>Must have between 2 and 10 images</li>
                </ul>
              </div>
            <button style={{background: `${!validImage ? '#FF3B30' : '#9FFC00'}`, animation: `${!validImage ? 'imageError 0.3s ease' : ''}`}} onClick={setNewImage} type='button'>Add</button>
            <Scroll images={arrayData.images} sizex='300px' sizey='180px'/>
          </div>
          <div className='Create-Platforms'>
            <label>Platforms</label>
            {/* <input style={errors.name && {outline: '3px solid red'}} autoComplete='off' name='platform' onChange={handleChange} value={data.platform} type='text'/>
            <button onClick={setNewPlatform} type='button'>Add</button> */}
            <div className='Create-Platforms-List'>
              {platforms && platforms.map(platform => (
                <label key={platform.id} onClick={selectPlatform} className={(arrayData.platforms.some(plat => plat.platform.name === platform.name) ? 'Create-Platforms-Selected' : undefined)}>{platform.name}</label>
              ))}
            </div>
            <div className={`Create-Platforms-Error ${!errors.platforms ? 'Create-NoError' : ''}`}>
                <ul>
                  <li>Must have at least one platform</li>
                </ul>
              </div>
          </div>
          <div className='Create-Genres'>
            <label>Genres</label>
            <div className='Create-Genres-List'>
              {genres && genres.map(genre => (
                <label key={genre.id} onClick={selectGenre} className={(arrayData.genres.some(gen => gen.name === genre.name) ? 'Create-Genres-Selected' : undefined)}>{genre.name}</label>
              ))}
            </div>
            <div className={`Create-Genres-Error ${!errors.genres ? 'Create-NoError' : ''}`}>
                <ul>
                  <li>Must have at least one genre</li>
                </ul>
              </div>
          </div>
          <div className='Create-Ratings'>
            <label>Ratings</label>
            <div className={`Create-Ratings-Error ${!errors.rating ? 'Create-NoError' : ''}`}>
              <ul>
                <li>Must have at least one rating</li>
              </ul>
            </div>
            <label style={{color: '#FFDF00'}}><span>{rating} </span>&#x2605;</label>
            <label style={{color: '#FFDF00'}}><span>Exceptional</span> &#x2605;<span>5</span></label>
            <input autoComplete='off' name='exceptional' onChange={handleChange} value={data.exceptional} type='text'/>
            <label style={{color: '#FFDF00'}}><span>Recommended</span> &#x2605;<span>4</span></label>
            <input autoComplete='off' name='recommended' onChange={handleChange} value={data.recommended} type='text'/>
            <label style={{color: '#FFDF00'}}><span>Meh</span> &#x2605;<span>3</span></label>
            <input autoComplete='off' name='meh' onChange={handleChange} value={data.meh} type='text'/>
            <label style={{color: '#FFDF00'}}><span>Skip</span> &#x2605;<span>1</span></label>
            <input autoComplete='off' name='skip' onChange={handleChange} value={data.skip} type='text'/>
          </div>
        </div>
        <button className={`Create-Submit ${Object.values(errors).some(error => error) && 'Create-Submit-Disable'}`} disabled={Object.values(errors).some(error => error)} type='submit'>Create</button>
      </form>
    </div>
  )
}
