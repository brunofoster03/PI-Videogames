const { User } = require('../../db')

const postUser = async (req, res) => {
  const { username, email, password } = req.body
  if(!username || !email || !password) return res.status(400).send('Bad request')
  try{
    const [user, created] = await User.findOrCreate({
      where: {
        username,
        email
      },
      defaults: {
        password
      }
    })
    return created ? res.json({ access: true }) : res.status(409).send({ access: false })
  }
  catch(error){
    return res.status(500).send(error)
  }
}

module.exports = {
  postUser
}