  import React, { useEffect, useState } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import './Options.css'
  import optionsImage from '../../Images/optionsImage.png'
  import axios from 'axios'
  import { filterGames } from '../../../redux/actions'

  export default function Options({ active, setActive }) {
    const dispatch = useDispatch()
    const [genres, setGenres] = useState([])
    const [isActive, setIsActive] = useState(false)
    useEffect(() => {
      if(active === 'searchbar'){
        setIsActive(false)
        setGenreActive({...genreActive, activeList: false})
        setOriginActive({...originActive, activeList: false})
        setOrderActive({...orderActive, activeList: false})
      }
    },[active])
    useEffect(() => {
      if(isActive) setActive('option')
    },[isActive])
    const [genreActive, setGenreActive] = useState({
      activeList: false,
      genre: 'all'
    })
    const [originActive, setOriginActive] = useState({
      activeList: false,
      origin: 'all'
    })
    const [orderActive, setOrderActive] = useState({
      activeList: false,
      order: 'all'
    })
    const getGenres = async () => {
      const ENDPOINT = 'http://localhost:3001/genres'
      const { data } = await axios(ENDPOINT)
      setGenres(data)
    }
    useEffect(() => {
      getGenres()
    },[])
    useEffect(() => {
      const getValues = async () => {
        const ENDPOINT = 'http://localhost:3001/videogames/option/values'
        let { data: { genre, origin, order } } = await axios(ENDPOINT)
        const genreName = genre === 'all' ? 'all' : genres.find(gen => gen.id === parseInt(genre))?.name.toLowerCase().replace(' ','-')
        setGenreActive({
          ...genreActive,
          genre: genreName
        })
        setOriginActive({
          ...originActive,
          origin
        })
        setOrderActive({
          ...orderActive,
          order
        })
        dispatch(filterGames({option: 'filter', condition: genre}))
        dispatch(filterGames({option: 'origin', condition: origin}))
        dispatch(filterGames({option: 'order', condition: order}))
      }
      getValues()
    },[genres])
    const handleActive = () => {
      setIsActive(!isActive)
      setGenreActive({...genreActive, activeList: false})
      setOriginActive({...originActive, activeList: false})
      setOrderActive({...orderActive, activeList: false})
    }
    const handleClick = (event) => {
      const button = event.target.name
      if(button === 'genre'){
        setOriginActive({...originActive, activeList: false})
        setOrderActive({...orderActive, activeList: false})
        setGenreActive({...genreActive, activeList: !genreActive.activeList})
      }
      if(button === 'origin'){
        setGenreActive({...genreActive, activeList: false})
        setOrderActive({...orderActive, activeList: false})
        setOriginActive({...originActive, activeList: !originActive.activeList})
      }
      if(button === 'order'){
        setGenreActive({...genreActive, activeList: false})
        setOriginActive({...originActive, activeList: false})
        setOrderActive({...orderActive, activeList: !orderActive.activeList})
      }
    }
    const handleGenreChange = (genre, genreName) => {
      setGenreActive({...genreActive, activeList: false, genre: genreName})
      dispatch(filterGames({option: 'filter', condition: genre}))
    }
    const handleOriginChange = (origin) => {
      setOriginActive({...originActive, activeList: false, origin: origin})
      dispatch(filterGames({option: 'origin', condition: origin}))
    }
    const handleOrderChange = (order) => {
      setOrderActive({...orderActive, activeList: false, order: order})
      dispatch(filterGames({option: 'order', condition: order}))
    }
    return (
      <div className='Options'>
        <button onClick={handleActive} className={`Options-Button ${isActive && 'Options-Button-Active'}`}><img src={optionsImage}/></button>
        <div className={`Options-Options ${isActive && 'Options-Options-Active'}`}>
          <div className='Options-Filter'>
            <div className='Options-Filter-Genres'>
              <button onClick={handleClick}  name='genre' className={`Options-Filter-Genres-Button ${isActive && 'Options-Filter-Genres-Button-Active'} ${genreActive.activeList && 'Options-Options-Button-Active'}`}><img src={genreActive.genre && `Options/${genreActive.genre}.png`}/></button>
              <table className={`Options-Table Options-Table-FilterGenres ${genreActive.activeList && 'Options-Table-ActiveList'}`}>
                <tbody>
                    <tr onClick={() => handleGenreChange('all', 'all')} className={`${'all' === genreActive.genre && 'Options-Table-Selected'}`} key='all-genres'>
                      <td><img src={'Options/all.png'}/></td>
                      <td>All genres</td>
                    </tr>
                  {genres?.map(genre => {
                    const genreId = genre.id
                    const auxGenre = (genre.name.toLowerCase()).replace(' ', '-')
                    return (
                      <tr onClick={() => handleGenreChange(genreId, auxGenre)} className={`${auxGenre === genreActive.genre && 'Options-Table-Selected'}`} key={genre.id}>
                      <td><img src={`Options/${auxGenre}.png`}/></td>
                      <td>{genre.name}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className='Options-Filter-Origin'>
              <button onClick={handleClick} name='origin' className={`Options-Filter-Origin-Button ${originActive.activeList && 'Options-Options-Button-Active'}`}><img src={`Options/${originActive.origin}.png`}/></button>
              <table className={`Options-Table Options-Table-FilterOrigin ${originActive.activeList && 'Options-Table-ActiveList'}`}>
                <tbody>
                  <tr onClick={() => handleOriginChange('all')} className={`${'all' === originActive.origin && 'Options-Table-Selected'}`} key='filter-all'>
                    <td><img src={'Options/all.png'}/></td>
                    <td>All videogames</td>
                  </tr>
                  <tr onClick={() => handleOriginChange('api')} className={`${'apiVideogames' === originActive.origin && 'Options-Table-Selected'}`} key='filter-api'>
                    <td><img src={'Options/api.png'}/></td>
                    <td>External videogames</td>
                  </tr>
                  <tr onClick={() => handleOriginChange('database')} className={`${'dbVideogames' === originActive.origin && 'Options-Table-Selected'}`} key='filter-database'>
                    <td><img src={'Options/database.png'}/></td>
                    <td>Users videogames</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={`Options-Order`}>
            <button onClick={handleClick} name='order' className={`Options-Order-Button ${isActive && 'Options-Order-Button-Active'} ${orderActive.activeList && 'Options-Options-Button-Active'}`}><img src={`Options/${orderActive.order}.png`}/></button>
            <table className={`Options-Table Options-Table-Order ${orderActive.activeList && 'Options-Table-ActiveList'}`}>
                <tbody>
                  <tr onClick={() => handleOrderChange('relevant')} className={`${'all' === orderActive.order && 'Options-Table-Selected'}`} key='order-all'>
                    <td><img src={'Options/relevant.png'}/></td>
                    <td>Relevant Order</td>
                  </tr>
                  <tr onClick={() => handleOrderChange('alphAsc')} className={`${'ascendingOrder' === orderActive.order && 'Options-Table-Selected'}`} key='order-asc'>
                    <td><img src={'Options/alphAsc.png'}/></td>
                    <td>A-Z Order</td>
                  </tr>
                  <tr onClick={() => handleOrderChange('alphDesc')} className={`${'descendingOrder' === orderActive.order && 'Options-Table-Selected'}`} key='order-desc'>
                    <td><img src={'Options/alphDesc.png'}/></td>
                    <td>Z-A Order</td>
                  </tr>
                  <tr onClick={() => handleOrderChange('ratingAsc')} className={`${'ascendingRatingOrder' === orderActive.order && 'Options-Table-Selected'}`} key='order-relasc'>
                    <td><img src={'Options/ratingAsc.png'}/></td>
                    <td>Ascending Rating</td>
                  </tr>
                  <tr onClick={() => handleOrderChange('ratingDesc')} className={`${'descendingRatingOrder' === orderActive.order && 'Options-Table-Selected'}`} key='order-reldesc'>
                    <td><img src={'Options/ratingDesc.png'}/></td>
                    <td>Descending Rating</td>
                  </tr>
                </tbody>
              </table>
          </div>
        </div>
      </div>
    )
  }
