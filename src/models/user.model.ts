import { Model, Optional, Sequelize } from "sequelize";
import { UserInterface } from "../interfaces/user.interface";
const { DataTypes } = require("sequelize");

export type UserCreationAttributes = Optional<UserInterface, "id">;

export class UserModel extends Model<UserInterface, UserCreationAttributes> implements UserInterface {
  public id: number;
  public name: string;
  public record_status: number;
  public created_by: number;
  public created_at: Date;
  public updated_by: number;
  public updated_at: Date;
  public deleted_at: Date | null;
  public deleted_by: number | null;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      record_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "user",  // This should match the name of the table in your database
      sequelize,
      timestamps: false,  // We're manually handling timestamps
    }
  );

  return UserModel;
}
