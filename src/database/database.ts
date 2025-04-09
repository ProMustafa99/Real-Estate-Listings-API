import Sequelize from "sequelize";
import RealEstatModel from "../models/realestate.model";
import UserModel from "../models/user.model";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "../config";
import  CityModel  from "../models/city.model";
import  TypeModel  from "../models/type.model";

export const sequelize = new Sequelize.Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

sequelize.authenticate();

export const DB = {
  Estate: RealEstatModel(sequelize),
  User: UserModel(sequelize),
  City : CityModel(sequelize),
  Type : TypeModel(sequelize),
  sequelize,
  Sequelize,
};
