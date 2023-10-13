module.exports = (sequelize, DataTypes) => {
  const Parking_User = sequelize.define(
    "parking_user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      parking_id: {
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
      modelName: "ParkingUserModel",
    }
  );
  return Parking_User;
};
