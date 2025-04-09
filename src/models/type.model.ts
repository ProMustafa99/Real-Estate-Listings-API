import { Model, Optional, Sequelize } from "sequelize";
import { TypeInterface } from "../interfaces/type.interface";
const { DataTypes } = require("sequelize");

export type typeCreationAttributes = Optional<TypeInterface, "id">;

export class TypeModel extends Model<TypeInterface, typeCreationAttributes> implements TypeInterface {
  public id: number;
  public name: string;
  public description:string;
  public record_status: number;
  public created_by: number;
  public created_at: Date;
  public updated_by: number;
  public updated_at: Date;
  public deleted_at: Date | null;
  public deleted_by: number | null;
}


export default function (sequelize: Sequelize): typeof TypeModel{
    TypeModel.init(
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
      description:{
        type :DataTypes.STRING,
        allowNull: true,
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
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
      tableName: "type",
      sequelize,
      timestamps: false,
    }
  );

  return TypeModel;
}
