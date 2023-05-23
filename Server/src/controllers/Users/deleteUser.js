const { User } = require('../../db')

const deleteUser = async (req, res) => {
  const { username } = req.body
  try{
    await User.destroy({
      where: {
        username
      }
    })
    return res.send('User deleted')
  }
  catch(error){
    return res.status(500).send(error)
  }
}

module.exports = {
  deleteUser
}