"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Parking_User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Parking_User.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      Parking_User.belongsTo(models.Parking, {
        foreignKey: "parking_id",
        as: "parking",
      });
    }
  }
  Parking_User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      parkings_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "parkings_users",
      classMethods: {},
      sequelize,
      modelName: "Parking_User",
    }
  );
  return Parking_User;
};
