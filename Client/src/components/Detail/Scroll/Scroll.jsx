import React, { useState, useEffect, useRef } from 'react'
import './Scroll.css'
import leftArrow from '../../Images/leftArrow.png'
import rightArrow from '../../Images/rightArrow.png'

export default function Scroll({ images, sizex, sizey }) {
  const [scroll, setScroll] = useState(0)
  const [isHovered, setIsHovered] = useState(false) 
  const timeoutRef = useRef(null)
  const scrollLeft = () => {
    const maxImages = images.length
    let auxScroll = scroll - 100
    if(auxScroll < 0) setScroll(100 * (maxImages - 1))
    else setScroll(scroll - 100)
  }
  const scrollRight = () => {
    const maxImages = images.length
    let auxScroll = scroll + 100
    if((auxScroll / 100) === maxImages) setScroll(0)
    else setScroll(scroll + 100)
  }
  const scrollTimeout = () => {
    timeoutRef.current = setTimeout(() => {
      if(images.length > 1) scrollRight()
    }, 6000);
  }
  const autoScroll = () => {
    if(!isHovered){
      scrollTimeout()
    }
  }
  const hovered = (bool) => {
    setIsHovered(bool)
    if(bool) clearTimeout(timeoutRef.current)
  }
  useEffect(() => {
    autoScroll()
    return () => {
      clearTimeout(timeoutRef.current)
    }
  },[scroll, isHovered])
  return (
    <>
      <div className='Detail-Scroll-Cont' style={{width: sizex, height: sizey}} onMouseEnter={() => hovered(true)} onMouseLeave={() => hovered(false)}>
        <div className='Detail-Scroll-Prev' onClick={() => scrollLeft()}><img src={leftArrow}/></div>
        <div className='Detail-Scroll-Next' onClick={() => scrollRight()}><img src={rightArrow}/></div>
        {images?.map((image, index) => (<img style={{transform: `translateX(-${scroll}%)`, width: sizex}} key={index} src={image}/>))}
      </div>
    </>
  )
}
