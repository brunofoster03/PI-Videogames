const { Videogame } = require('../../db')
const ENDPOINT = 'https://api.rawg.io/api/games'
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')

const getVideogamesById = async (req, res) => {
  const { idVideogame } = req.params
  try{
    if(idVideogame.includes('user')){
      const videogame = await Videogame.findByPk(idVideogame)
      if(!videogame) return res.status(400).send('Invalid game')
      return res.json(videogame)
    }else{
      const { data } = await axios(`${ENDPOINT}/${idVideogame}?key=${API_KEY}`)
      if(!data) return res.status(400).send('Invalid game')
      return res.json(data)
    }
  }
  catch(error){
    return res.status(500).send(error)
  }
}

module.exports = {
  getVideogamesById
}