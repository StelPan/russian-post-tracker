'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_track.init({
    user_id: DataTypes.BIGINT,
    track_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'user_track',
    underscored: true,
  });
  return user_track;
};