"use strict";
import { Model } from "sequelize";

export default class User extends Model {
  static associate(models) {
    // Definir las relaciones aquí
    User.hasMany(models.Parking, {
      foreignKey: "admin_id", // Clave foránea en la tabla Parkings
      as: "parkings", // Alias de la relación
    });

    User.belongsToMany(models.Parking, {
      through: "Parkings_User", // Nombre de la tabla intermedia
      foreignKey: "user_id", // Clave foránea en la tabla intermedia
      as: "parkings_users", // Alias de la relación
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: "users",
    sequelize,
    modelName: "User",
  }
);
