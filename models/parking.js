"use strict";
import { Model } from "sequelize";
import User from "./user";

export default (sequelize, DataTypes) => {
  class Parking extends Model {
    static associate(models) {
      Parking.belongsTo(models.User, {
        foreignKey: "admin_id",
        as: "admin",
      });
      Parking.belongsToMany(models.User, {
        through: "Parkings_Users",
        foreignKey: "parking_id",
        as: "parkings_users",
      });
    }
  }
  Parking.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      base_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      floor_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      places_per_floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      freezeTableName: true,
      tableName: "parkings",
      sequelize,
      modelName: "Parking",
    }
  );
  return Parking;
};
