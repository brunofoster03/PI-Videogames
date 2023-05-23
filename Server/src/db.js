require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`, {
  logging: false,
  native: false,
});



const VideogameModel = require('./models/Videogame')
const GenreModel = require('./models/Genre')
const UserModel = require('./models/User')

VideogameModel(sequelize);
GenreModel(sequelize);
UserModel(sequelize);

const { Videogame, Genre, User } = sequelize.models;

Videogame.belongsToMany(Genre, {through: 'videogame_genre', timestamps: false, as: 'genres'})
Genre.belongsToMany(Videogame, {through: 'videogame_genre', timestamps: false})
User.belongsToMany(Videogame, {through: 'user_videogames', timestamps: false})
Videogame.belongsTo(User, {through: 'user_videogames', timestamps: false})

module.exports = {
  Videogame,
  Genre,
  User,
  conn: sequelize,
};
