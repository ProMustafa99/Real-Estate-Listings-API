import { Service } from "typedi";
import { DB } from "../database/database";
import { RealEstateInterface } from "../interfaces/realestate.interface";
import { HttpException } from "../exceptions/httpException";
import { UserInterface } from "../interfaces/user.interface";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { CityInterface } from "../interfaces/city.interface";

@Service()
class RealEstate {
  private realEstateDB = DB.Estate;
  private UserDB = DB.User;
  private CityDB = DB.City;
  private typeDB = DB.Type;


  public async getAllRealEstate(
    pageNumber: number,
    filters: {
      cityId?: number;
      typeId?: number;
      minPrice?: number;
      maxPrice?: number;
    }
  ): Promise<object> {
    const countPerPage = 5;
    const offset = (pageNumber - 1) * countPerPage;

    const whereClause: any = {
      record_status: 2,
    };

    if (filters.cityId) whereClause.city_id = filters.cityId;
    if (filters.typeId) whereClause.type_id = filters.typeId;
    if (filters.minPrice || filters.maxPrice) {
      whereClause.price = {};
      if (filters.minPrice) whereClause.price[Op.gte] = filters.minPrice;
      if (filters.maxPrice) whereClause.price[Op.lte] = filters.maxPrice;
    }

    const totalCount = await this.realEstateDB.count({ where: whereClause });
    const totalPages = Math.ceil(totalCount / countPerPage);

    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new HttpException(400, "Invalid page number");
    }

    if (pageNumber > totalPages && totalCount > 0) {
      throw new HttpException(404, "Page number exceeds total pages");
    }

    const getUserName = (field: string) =>
      sequelize.literal(
        `(SELECT name FROM user WHERE user.id = RealEstatModel.${field})`
      );

    const getCityName = (field: string) =>
      sequelize.literal(
        `(SELECT name FROM city WHERE city.id = RealEstatModel.${field})`
      );

    const getTypeName = (field: string) =>
      sequelize.literal(
        `(SELECT name FROM type WHERE type.id = RealEstatModel.${field})`
      );

    try {
      const allRealEstate: RealEstateInterface[] =
        await this.realEstateDB.findAll({
          attributes: [
            "id",
            "title",
            "description",
            "bed_rooms",
            "bath_rooms",
            "year_built",
            "image",
            "price",
            [getTypeName("type_id"), "type"],
            [getCityName("city_id"), "city"],
            "created_at",
            [getUserName("created_by"), "author"],
            "record_status",
          ],
          where: whereClause,
          offset,
          limit: countPerPage,
          order: [["id", "DESC"]],
        });

      return {
        data: allRealEstate.length ? allRealEstate : "Not Found RealEstate",
        totalRecords: totalCount,
        totalPages,
        currentPage: pageNumber,
      };
    } catch (error: any) {
      console.error("Error fetching real estate:", error.message);
      console.error("Stack trace:", error.stack);
      throw new HttpException(500, `Database query failed ${error.message}`);
    }
  }

  public async createRealEstate(data: RealEstateInterface, userId: number): Promise<RealEstateInterface> {
    const user_id: UserInterface = await this.UserDB.findOne({
      attributes: ["id"],
      where: { id: userId, record_status: 2 },
    });

    if (!user_id) throw new HttpException(404, "User doesn't exist");

    if (data.city_id) {

      const city: CityInterface = await this.CityDB.findOne({
        attributes: ["id"],
        where: { id: data.city_id, record_status: 2 },
      });

      if (!city) throw new HttpException(404, "City doesn't exist");
    }

    if (data.type_id) {

      const type: CityInterface = await this.CityDB.findOne({
        attributes: ["id"],
        where: { id: data.type_id, record_status: 2 },
      });

      if (!type) throw new HttpException(404, "Type doesn't exist");
    }

    try {
      const create_realEstate: RealEstateInterface =
        await this.realEstateDB.create({
          ...data,
          record_status: 2,
          created_by: user_id.id,
          created_at: new Date(),
        });
      return create_realEstate;
    } catch (error) {
      console.error("Error fetching real estate:", error.message);
      console.error("Stack trace:", error.stack);
      throw new HttpException(500, `Database query failed ${error.message}`);
    }
  }

  public async DeleteRealEstate(id: number, user_id: number): Promise<string> {
    const realestate: RealEstateInterface = await this.realEstateDB.findOne({
      attributes: ["id", "record_status"],
      where: { id: id, record_status: 2 },
    }); // create privete function to get  realestate

    const userid: UserInterface = await this.UserDB.findOne({
      attributes: ["id"],
      where: { id: user_id, record_status: 2 },
    });

    if (!userid) throw new HttpException(404, "User doesn't exist");

    if (!realestate || realestate.record_status === 3)
      throw new HttpException(404, "RealEstate doesn't exist");

    try {
      await this.realEstateDB.update(
        { record_status: 3, deleted_by: user_id, deleted_at: new Date() },
        { where: { id: id } }
      );
    } catch (error: any) {
      console.error("Error fetching real estate:", error.message);
      console.error("Stack trace:", error.stack);
      throw new HttpException(500, `Database query failed ${error.message}`);
    }
    return `RealEstate ${id} successfully deleted`;
  }

  public async UpdateRealEstate(
    id: number,
    data: RealEstateInterface,
    user_id: number
  ): Promise<string> {

    const realestate: RealEstateInterface = await this.realEstateDB.findOne({
      attributes: ["id", "record_status"],
      where: { id: id, record_status: { [Op.ne]: 3 } },
    });

    if (!realestate) throw new HttpException(404, "RealEstate doesn't exist");

    if (data.city_id) {

      const city: CityInterface = await this.CityDB.findOne({
        attributes: ["id"],
        where: { id: data.city_id, record_status: 2 },
      });

      if (!city) throw new HttpException(404, "City doesn't exist");
    }

    if (data.type_id) {

      const type: CityInterface = await this.CityDB.findOne({
        attributes: ["id"],
        where: { id: data.type_id, record_status: 2 },
      });

      if (!type) throw new HttpException(404, "Type doesn't exist");
    }

    try {
      const [updatedrealEstate] = await this.realEstateDB.update(
        {
          ...data,
          updated_by: user_id,
          updated_at: new Date(),
        },
        { where: { id: id } }
      );
      if (updatedrealEstate === 0) {
        throw new HttpException(400, "Failed to update RealEstate");
      }
    } catch (error) {
      console.error("Error fetching real estate:", error.message);
      console.error("Stack trace:", error.stack);
      throw new HttpException(500, `Database query failed ${error.message}`);
    }

    return `RealEstate ${id} updated successfully`;
  }
}

export const realstate = new RealEstate();
