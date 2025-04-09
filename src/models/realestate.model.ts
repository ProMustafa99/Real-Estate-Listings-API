import { Model, Optional, Sequelize } from "sequelize";
import { RealEstateInterface } from "../interfaces/realestate.interface";
const { DataTypes } = require("sequelize");

export type RealEstateCreationAttributes = Optional<RealEstateInterface, "id">;

export class RealEstatModel extends Model<RealEstateInterface, RealEstateCreationAttributes> implements RealEstateInterface {
  public id: number;
  public title: string;
  public description: string;
  public bed_rooms: number;
  public bath_rooms: number;
  public year_built: number;
  public image: string;
  public price: number;
  public type_id: number;
  public city_id: number;
  public record_status: number;
  public created_by: number;
  public created_at: Date;
  public updated_by: number;
  public updated_at: Date;
  public deleted_at: Date | null;
  public deleted_by: number | null;

}

export default function (sequelize: Sequelize): typeof RealEstatModel {
  RealEstatModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      bed_rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bath_rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year_built: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      record_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "estate",
      sequelize,
      timestamps: false,
    }
  );

  return RealEstatModel;
}
