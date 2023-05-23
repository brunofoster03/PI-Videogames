import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './Cards.css'
import Card from './Card/Card'
import leftArrow from '../../Images/leftArrow.png'
import rightArrow from '../../Images/rightArrow.png'
import Loader from '../../Loader/Circle/Loader'

export default function Cards() {
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState(0)
  const [gamesPage, setGamesPage] = useState([])
  const [previousPage, setPreviousPage] = useState(1)
  let videogames = useSelector(state => state?.videogames)
  useEffect(() => {
    updateGamesPage(1)
    const maxPages = Math.ceil(videogames?.length / 15)
    setAllPages(maxPages)
  },[videogames])
  const updateGamesPage = (page) => {
    const startIndex = (page - 1) * 15
    const endIndex = startIndex + 15
    setGamesPage(videogames?.slice(startIndex, endIndex))
    setPage(page)
  }
  const handleChangePage = (event) => {
    if(videogames?.length !== 0){
      const nextPage = event.target.name === 'next' ? (page === allPages ? 1 : page + 1) : (page === 1 ? allPages : page - 1)
      updateGamesPage(nextPage)
      setPreviousPage(nextPage)
    }
  }
  const handleInputPage = (event) => {
    const newPage = event.target.value === '' ? '' : parseInt(event.target.value)
    if(newPage === ''){
      setPage(newPage)
    }else if(/^[0-9]+$/.test(newPage)){
      if(newPage >= 1 && newPage <= allPages){
        setPage(newPage)
      }else{
        if(newPage < 1){
          setPage(1)
        }
        if(newPage > allPages){
          setPage(allPages)
        }
      }
    }
  }
  const handleBlurPage = (event) => {
    const inputValue = event.target.value === '' ? '' : parseInt(event.target.value)
    if(previousPage === parseInt(inputValue)){
      return;
    }
    if(inputValue === ''){
      const blurPage = page
      const blurPrev = previousPage
      setPage(blurPrev)
      updateGamesPage(blurPrev)
      setPreviousPage(blurPage)
    }else if(/^[0-9]+$/.test(inputValue)){
      if(inputValue >= 1 && inputValue <= allPages){
        setPage(inputValue)
        setPreviousPage(inputValue)
        updateGamesPage(inputValue)
      }else{
        if(inputValue < 1){
          setPage(1)
          setPreviousPage(1)
          updateGamesPage(1)
        }
        if(inputValue > allPages){
          setPage(allPages)
          setPreviousPage(allPages)
          updateGamesPage(allPages)
        }
      }
    }
  }
  const handleKeyDown = (event) => {
    if(event.keyCode === 13 || event.keyCode === 27){
      handleBlurPage
      event.target.blur()
    }
  }
  const handleInputFocus = (event) => {
    event.target.value = ''
  }
  return (
    <div className='Cards'>
      {videogames?.length > (videogames?.filter(game => game.id.toString().includes('-')).length || 0) ? (
        <>
          <div className='Cards-Page'><button name='prev' onClick={handleChangePage}><img name='prev' src={leftArrow}/></button><input value={page} onChange={handleInputPage} onKeyDown={handleKeyDown} onBlur={handleBlurPage} onFocus={handleInputFocus}/><button name='next' onClick={handleChangePage}><img name='next' src={rightArrow}/></button></div>
          {gamesPage?.map(game => (
          <Card 
            key={game.id}
            id={game.id}
            background={game.background_image ? game.background_image : game.background_image_additional}
            name={game.name}
            released={game.released}
            rating={game.rating}
            genres={game.genres ? game.genres : null}
          />
          ))}
        </>
      ) : (<Loader color='white'/>)}
    </div>
  )
}
