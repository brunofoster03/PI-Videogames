import React from 'react'
import './Ratings.css'

export default function Ratings({ game }) {
  const getRatings = (id) => {
    return (game?.ratings).find(rating => rating.id === id)
  }
  return (
    <div className='Detail-Rating-Information'>
      <label className='Detail-Rating-Global'>{game && game?.rating}<span style={{color: '#FFDF00'}}> &#x2605;</span></label>
      <div className='Detail-Rating-Exceptional'>
        <label className='Detail-Rating-Title'>Exceptional</label>
        <div className='Detail-Progressbar'>
          <div className='Detail-Progress' style={{width: `${game?.ratings && getRatings(5).percent}%`}}>{`${game?.ratings && getRatings(5).percent}% (${game?.ratings && getRatings(5).count})`}</div>
        </div>
      </div>
      <div className='Detail-Rating-Recommended'>
        <label className='Detail-Rating-Title'>Recommended</label>
        <div className='Detail-Progressbar'>
          <div className='Detail-Progress' style={{width: `${game?.ratings && getRatings(4).percent}%`}}>{`${game?.ratings && getRatings(4).percent}% (${game?.ratings && getRatings(4).count})`}</div>
        </div>
      </div>
      <div className='Detail-Rating-Meh'>
        <label className='Detail-Rating-Title'>Meh</label>
        <div className='Detail-Progressbar'>
          <div className='Detail-Progress' style={{width: `${game?.ratings && getRatings(3).percent}%`}}>{`${game?.ratings && getRatings(3).percent}% (${game?.ratings && getRatings(3).count})`}</div>
        </div>
      </div>
      <div className='Detail-Rating-Skip'>
        <label className='Detail-Rating-Title'>Skip</label>
        <div className='Detail-Progressbar'>
          <div className='Detail-Progress' style={{width: `${game?.ratings && getRatings(1).percent}%`}}>{`${game?.ratings && getRatings(1).percent}% (${game?.ratings && getRatings(1).count})`}</div>
        </div>
      </div>
    </div>
  )
}
