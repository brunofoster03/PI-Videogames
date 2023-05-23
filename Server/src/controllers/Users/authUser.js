const { Op } = require('sequelize')
const { User } = require('../../db')

const authUser = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  if(!username || !password) return res.status(400).send('Bad request')
  try{
    const user = await User.findOne({
      where: {
        username: {
          [Op.iLike]: username
        }
      },
      attributes: ['password']
    })
    if(!user) return res.json({ access: false })
    return res.json({ access: user.password === password ? true : false })
  }
  catch(error){
    return res.status(500).send(error)
  }
}

module.exports = {
  authUser
}