const { DataTypes, UUIDV4 } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description_raw: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    background_image_additional: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: false,
    },
    ratings: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publishers: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    }
  }, {timestamps: false});
};
