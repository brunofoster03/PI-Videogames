const { Videogame } = require('../../db')
const { Op } = require('sequelize')
const { getArray } = require('./getVideogames')

  let videogames;
const getVideogamesByName = async (req, res) => {
  const name = req.query.name?.toLowerCase()
  if(!name) return res.json([])
  if(!videogames?.length) videogames = getArray()
  try{
    const databaseVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    })
    const searchKeys = name.split(' ')
    const apiVideogames = videogames.filter(game => {
      const gameKeys = game.name.split(' ')
      return searchKeys.every(key => gameKeys.some(gameKey => gameKey.toLowerCase().includes(key)))
    })
    const searchVideogames = databaseVideogames.concat(apiVideogames)
    if(!searchVideogames) return res.status(404).send('No matches found')
    return res.json(searchVideogames)
  }
  catch(error){
    return res.status(500).send(error)
  }
}

module.exports = {
  getVideogamesByName
}