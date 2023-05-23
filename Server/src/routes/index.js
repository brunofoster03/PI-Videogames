const { Router } = require('express');
const { getVideogames, getPlatforms } = require('../controllers/Videogames/getVideogames')
const { getVideogamesById } = require('../controllers/Videogames/getVideogamesById.js')
const { getVideogamesByName } = require('../controllers/Videogames/getVideogamesByName')
const { postVideogames } = require('../controllers/Videogames/postVideogames')
const { getGenres } = require('../controllers/Genres/getGenres')
const { postUser } = require('../controllers/Users/postUser')
const { deleteUser } = require('../controllers/Users/deleteUser')
const { authUser } = require('../controllers/Users/authUser')
const { getUser } = require('../controllers/Users/getUser')
const { optionGames, getOptions } = require('../controllers/Videogames/filterVideogames')

const router = Router();

router.get('/videogames', getVideogames)
router.get('/videogames/name', getVideogamesByName)
router.get('/videogames/option/values', getOptions)
router.get('/videogames/option/:option/:condition', optionGames)
router.get('/videogames/:idVideogame', getVideogamesById)
router.post('/videogames', postVideogames)
router.get('/genres', getGenres)
router.post('/user/create', postUser)
router.delete('/user/delete', deleteUser)
router.post('/user/auth', authUser)
router.get('/user/:username', getUser)
router.get('/platforms', getPlatforms)


module.exports = router;
