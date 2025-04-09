import { Model, Optional, Sequelize } from "sequelize";
import { CityInterface } from "../interfaces/city.interface";
const { DataTypes } = require("sequelize");

export type CityCreationAttributes = Optional<CityInterface, "id">;

export class CityModel extends Model<CityInterface, CityCreationAttributes> implements CityInterface {
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

export default function (sequelize: Sequelize): typeof CityModel {
    CityModel.init(
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
      tableName: "city",
      sequelize,
      timestamps: false,
    }
  );

  return CityModel;
}
