import Sequelize from "sequelize";
import  BlogModel  from "../models/blog.model";
import  CommentModel  from "../models/comments.model";


// we Need to create the .env file
const sequelize = new Sequelize.Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306, // Change from 3000 to 3306
  username: "root",
  password: "root",
  database: "task3",
  logging: false, // This is fine for now; you can enable it if you need to debug
});


sequelize.authenticate();

export const DB = {
  Blog: BlogModel(sequelize),
  Commints:CommentModel(sequelize),
  sequelize,
  Sequelize,
};


