const { Videogame, Genre, User, conn } = require('../../db')

const postVideogames = async (req, res) => {
  const { name, description, platforms, images, released, rating, ratings, genres, publishers } = req.body
  if(!name || !description || !platforms || !images || !released || !rating || !ratings || !genres){
    return res.status(400).send('Missing data')
  }
  const background_image_additional = images.shift()
  try{
    const { name: username } = publishers[0]
    const {id: UserId} = await User.findOne({
      where: { username: publishers[0].name }
    })
    const nextId = await conn.query(`
      SELECT COUNT(*) FROM "Videogames" WHERE "username" = :username
    `, {
      replacements: { username },
      type: conn.QueryTypes.SELECT
    })
    const newVideogame = await Videogame.create({
      id: `${username}-${parseInt(nextId[0].count) + 1}`,
      name,
      description_raw: description,
      platforms,
      images,
      background_image_additional,
      released,
      rating,
      ratings,
      publishers,
      username,
      UserId
    })
    const databaseGenres = await Promise.all(genres.map(genre => Genre.findOne({where: {name: genre.name}})))
    await newVideogame.setGenres(databaseGenres)
    return res.json(newVideogame)
  }
  catch(error){
    console.log(error)
    return res.status(500).send(error)
  }
}

module.exports = {
  postVideogames
}