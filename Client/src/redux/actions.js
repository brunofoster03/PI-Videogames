import axios from "axios";

export const setVideogames = () => {
  const ENDPOINT = 'http://localhost:3001/videogames'
  return async (dispatch) => {
    try{
      const { data } = await axios(ENDPOINT)
      if(data){
        return dispatch({
          type: 'SET_VIDEOGAMES',
          payload: data
        })
      }
    }
    catch(error){
      return dispatch({
        type: 'SET_VIDEOGAMES',
        payload: error
      })
    }
  }
}

export const filterGames = (values) => {
  const ENDPOINT = `http://localhost:3001/videogames/option/${values.option}/${values.condition}`
  return async (dispatch) => {
    try{
      const { data } = await axios(ENDPOINT)
      if(data){
        return dispatch({
          type: 'FILTER',
          payload: data
        })
      }
    }
    catch(error){
      return dispatch({
        type: 'FILTER',
        payload: error
      })
    }
  }
}

export const detailVideogame = (id) => {
  const ENDPOINT = `http://localhost:3001/videogames/${id}`
  return async (dispatch) => {
    try{
      const { data } = await axios(ENDPOINT)
      if(data){
        return dispatch({
          type: 'DETAIL_VIDEOGAME',
          payload: data
          })
      }
    }
    catch(error){
      return dispatch({
        type: 'DETAIL_VIDEOGAME',
        payload: error
      })
    }
  }
}

export const setUsername = (username) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_USERNAME',
      payload: username
    })
  }
}