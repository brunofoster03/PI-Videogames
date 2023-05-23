const { Genre } = require('../../db')
const ENDPOINT = 'https://api.rawg.io/api/genres'
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')

let databaseGenres = [];

const getGenres = async (req, res) => {
  try{
    databaseGenres = await Genre.findAll()
  if(!databaseGenres.length){
    const { data: { results } } = await axios(`${ENDPOINT}?key=${API_KEY}`)
    await Promise.all(
      results.map(async genre => await Genre.create({name: genre.name, id: genre.id}))
    )
    return res.json(await Genre.findAll())
  }else{
    return res.json(databaseGenres)
  }
  }
  catch(error){
    return error
  }
}

const returnGenres = async () => {
  return databaseGenres
}

module.exports = {
  getGenres,
  returnGenres
}