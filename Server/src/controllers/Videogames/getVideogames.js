const { Videogame, Genre } = require('../../db')
const ENDPOINT = 'https://api.rawg.io/api/games'
require('dotenv').config()
const {API_KEY} = process.env
const axios = require('axios')

let videogames = []
let dbVideogames = []
let platforms = []
const getVideogames = async (req, res) => {
  try{
    try{
      dbVideogames = await Videogame.findAll({ include: {
        model: Genre,
        as: 'genres'
      } })
    }
    catch(error){
      console.log(error)
    }

    dbVideogames.forEach(videogame => {
      videogame.genres = videogame.genres.map(genre => genre.name)
    })
    console.log(videogames)
    if(videogames.length > dbVideogames.length) return res.json(videogames.concat(dbVideogames))
    const { data: { results: results1 } } = await axios(`${ENDPOINT}?key=${API_KEY}&page_size=40`)
    const { data: { results: results2 } } = await axios(`${ENDPOINT}?key=${API_KEY}&page_size=40&page=2`)
    const { data: { results: results3 } } = await axios(`${ENDPOINT}?key=${API_KEY}&page_size=40&page=3`) 
    if(!videogames) return res.status(400).send('Bad Request')    
    videogames = videogames.concat(results1, results2, results3)
    videogames.forEach((videogame) => {
      const gamePlatforms = videogame.platforms.map(platform => platform.platform);
      platforms = platforms.concat(gamePlatforms);
    });
    platforms = platforms.reduce((unique, platform) => {
      const platformIds = unique.map(newPlatform => newPlatform.id);
      if (!platformIds.includes(platform.id)) {
        unique.push(platform);
      }
      return unique;
    }, []);
    return res.json(videogames.concat(dbVideogames))
  }
  catch(error){
    console.log(error)
    return res.status(500).send(error)
  }
}
const getArray = () => {
  return videogames
}

const getPlatforms = (req, res) => {
  return res.json(platforms)
}

module.exports = {
  getArray,
  getPlatforms,
  getVideogames
}