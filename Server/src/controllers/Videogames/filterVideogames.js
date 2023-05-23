const db = require('../../db');
const { Videogame, Genre } = require('../../db')
const { getArray } = require('./getVideogames')
const { returnGenres } = require('../Genres/getGenres')

let filterCondition = 'all';
let originCondition = 'all';
let orderCondition = 'relevant';
let apiVideogames;
let dbVideogames;

const optionGames = async (req, res) => {
  const { option, condition } = req.params;
  apiVideogames = getArray()
  try {
    dbVideogames = await Videogame.findAll({
      include: [
        {
          model: Genre,
          as: 'genres',
          through: { attributes: [] },
        },
      ],
      nest: true,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
  
  const relevantOrder = [...apiVideogames, ...dbVideogames].map(game => game.id)

  if(option === 'filter'){
    filterCondition = condition
  }else
  if(option === 'origin'){
    originCondition = condition
  }else
  if(option === 'order'){
    orderCondition = condition
  }

  let allVideogames;


  if(originCondition === 'api'){
    allVideogames = [...apiVideogames]
  }else
  if(originCondition === 'database'){
    allVideogames = [...dbVideogames]
  }else{
    allVideogames = [...apiVideogames, ...dbVideogames]
  }

  if(filterCondition !== 'all'){
    allVideogames = allVideogames.filter(game => game.genres.some(genre => genre.id === parseInt(filterCondition)))
  }

  if(orderCondition === 'ratingAsc'){
    allVideogames = allVideogames.sort((a, b) => a.rating - b.rating)
  }else
  if(orderCondition === 'ratingDesc'){
    allVideogames = allVideogames.sort((a, b) => b.rating - a.rating)
  }else
  if(orderCondition === 'alphAsc'){
    allVideogames = allVideogames.sort((a, b) => a.name.localeCompare(b.name))
  }else
  if(orderCondition === 'alphDesc'){
    allVideogames = allVideogames.sort((a, b) => b.name.localeCompare(a.name))
  }else
  if(orderCondition === 'relevant'){
    allVideogames = allVideogames.sort((a, b) => {
      const indexA = relevantOrder.indexOf(a.id)
      const indexB = relevantOrder.indexOf(b.id)
      return indexA - indexB
    })
  }

  return res.json(allVideogames);
};

const getOptions = async (req, res) => {
  // let genres = await returnGenres()
  // genres = genres.map(genre => genre.dataValues)
  return res.json({
    genre: filterCondition,
    origin: originCondition,
    order: orderCondition
  })
}

module.exports = {
  optionGames,
  getOptions
}