const { User } = require('../../db')

const getUser = async (req, res) => {
  const { username } = req.params
  try{
    const response = await User.findOne({
      where: {
        username
      }
    })
    return res.json(response ? { found: true } : { found: false });
  }
  catch(error){
    return res.status(500).send(error)
  }
}

module.exports = {
  getUser
}