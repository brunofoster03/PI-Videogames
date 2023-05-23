  import React, { useEffect, useState, useRef } from 'react'
  import { useNavigate } from 'react-router-dom'
  import './SearchBar.css'
  import searchImage from '../../Images/searchImage.png'
  import axios from 'axios'
  import Loader from '../../Loader/ThreeDots/Loader'

  export default function SearchBar({ active, setActive }) {
    const [searchedVideogames, setSearchedVideogames] = useState([])
    const [search, setSearch] = useState('')
    const [searchLoading, setSearchLoading] = useState(false)
    const [activateSearch, setActivateSearch] = useState(false)
    useEffect(() => {
      if(active === 'option'){
        setActivateSearch(false)
      }
    },[active])
    useEffect(() => {
      if(activateSearch) setActive('searchbar')
    },[activateSearch])
    const inputRef = useRef(null)
    const navigate = useNavigate()
    const handleChange = (event) => {
      setSearch(event.target.value)
    }
    const getSearch = async () => {
      setSearchLoading(true)
      // await new Promise(resolve => setTimeout(resolve, 10000000)) // Test Loader
      const ENDPOINT = `http://localhost:3001/videogames/name?name=${search}`
      try{
        const { data } = await axios(ENDPOINT)
        if(!data.length) setSearchedVideogames([])
        else setSearchedVideogames(data)
      }
      catch(error){
        console.log(error)
      }
      finally{
        setSearchLoading(false)
      }
    }
    useEffect(() => {
      getSearch()
    },[search])
    const handleSearchClick = () => {
      setActivateSearch(!activateSearch)
      setSearch('')
    }
    useEffect(() => {
      if(activateSearch) inputRef.current.focus()
      if(!activateSearch) setSearchedVideogames([])
    },[activateSearch])
    return (
      <div className='SearchBar'>
        <button onClick={handleSearchClick} className={`SearchBar-Button ${activateSearch ? 'SearchBar-Button-Active' : ''}`}><img src={searchImage}/></button>
        <div className={`SearchBar-Form ${search.length !== '' ? 'SearchBar-Form-Show' : ''} ${activateSearch ? 'SearchBar-Form-Activate' : ''}`}>
            <input onChange={handleChange} ref={inputRef} type='text' value={search} placeholder='Search videogames' spellCheck='false'/>
            {search.length > 0 ? (
            <table>
              <tbody>
                {searchedVideogames.length ? (
                  searchedVideogames.slice(0,15).map(game => (
                    <tr key={`game-${game.id}`} onClick={() => navigate(`/detail/${game.id}`)}>
                      <td><span><img src={game.background_image ? game.background_image : game.background_image_additional}/></span></td>
                      <td>{game.name}</td>
                      <td>{game.rating}<span style={{color: '#FFDF00'}}>&#x2605;</span></td>
                    </tr>
                  ))
                ) : (
                    searchLoading ? (
                      <tr className='SearchBar-Tr-Disable' key='loading'>
                        <td></td>
                        <td><Loader color='black'/></td>
                        <td></td>
                      </tr>
                    ) : (
                      <tr className='SearchBar-Tr-Disable' key='notfound'>
                        <td></td>
                        <td>Not videogames found</td>
                        <td></td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
            ) : null}
        </div>
      </div>
    )
  }
