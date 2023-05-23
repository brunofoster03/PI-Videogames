const initialState = {
  username: '',
  videogames: [],
  detailGame: {}
}


const reducer = (state = initialState, { type, payload}) => {
  switch(type){
    case 'FILTER':
      return {
        ...state,
        videogames: payload
      }
    case 'SET_VIDEOGAMES':
      return {
        ...state,
        videogames: payload
      }
    case 'DETAIL_VIDEOGAME':
      return {
        ...state,
        detailGame: payload
      }
    case 'SET_USERNAME':
      return {
        ...state,
        username: payload
      }
  }
}


export default reducer;