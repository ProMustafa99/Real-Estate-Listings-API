import "reflect-metadata";
import { NextFunction, Request, Response } from "express";
import { realstate } from "../services/realestate.service";
import { RequestWithUser } from "../interfaces/auth.interface";
import { RealEstateInterface } from "../interfaces/realestate.interface";
import { HttpException } from "../exceptions/httpException";

export class realEstateController {
  public realEstateService = realstate;

  public async getAllRealEstate(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const pageNumber = Number(req.query.page) || 1;
      const filters = {
        cityId: req.query.cityId ? Number(req.query.cityId) : undefined,
        typeId: req.query.typeId ? Number(req.query.typeId) : undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      };
  
      const getallRealEstate = await realstate.getAllRealEstate(pageNumber, filters);
      res.status(200).json(getallRealEstate);
    } catch (error: any) {
      next(error);
    }
  }
  
  public async createRealEstate(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      // const user_id = Number(req.user.id) || 1;
      const data:RealEstateInterface = req.body;

      // if (isNaN(user_id)) {
      //   res.status(400).json({ error: "Invalid user ID" });
      // }

      const newRealEstate = await realstate.createRealEstate(data,1);
      res.status(200).json({ message: "Done Create new RealEstate", data: newRealEstate });
    }
    catch (error: any) {
      next(error);
    }
  }

  public async updateRealEstate(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user_id = 1;
      const id = Number(req.params.id);
      const data = req.body;

      if (isNaN(id)) {
        res.status(400).json({ error: "Invalid RealEstate ID" });
      };

      const UpdateRealEstate = await realstate.UpdateRealEstate(id,data,user_id);
      res.status(200).json({ data: UpdateRealEstate });
    }
    catch (error: any) {
      next(error);
    }
  };

  public async DeleteRealEstate(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const user_id = 1; // Or get from req.user, depending on your setup
      const id = Number(req.params.id);
  
      if (isNaN(user_id)) {
        res.status(400).json({ error: 'Invalid user ID' });
      }
  
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid RealEstate ID' });
      }
  
      const deleteRealEstate = await realstate.DeleteRealEstate(id, user_id);
      
      res.status(204).json({
        message: 'Done Deleted RealEstate',
        data: deleteRealEstate
      });
    } catch (error: any) {
      if (error instanceof HttpException) {
        res.status(error.status).json({ message: error.message });
      } else {
        next(error);
      }
    }
  }
  
  
}
