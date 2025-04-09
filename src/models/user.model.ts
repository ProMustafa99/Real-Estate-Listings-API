import { ModelDefined, Optional } from "sequelize";
import { User, UserInstance } from "../interfaces/user.interface";

const { Sequelize, Model, DataTypes } = require("sequelize");

type UserAtttibutes = Optional<User, "id">;
const User: ModelDefined<User, UserAtttibutes> = Sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      autoIncrement: true,
      primaryKey: true,
    },

    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    record_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "user",
  }
);

export default User;
