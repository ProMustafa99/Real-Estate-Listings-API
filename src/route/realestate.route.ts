import { Router } from "express";
import { Routes } from "../interfaces/router.interface";
import { realEstateController } from "../controllers/realestate.controller";

export class realEstateRoute implements Routes {
  public router = Router();
  public path = '/realestate'
  public realEstateController = new realEstateController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.realEstateController.getAllRealEstate);
    this.router.post(`${this.path}`, this.realEstateController.createRealEstate);
    this.router.delete(`${this.path}/:id`, this.realEstateController.DeleteRealEstate);
    this.router.patch(`${this.path}/:id`, this.realEstateController.updateRealEstate);
  }
}
