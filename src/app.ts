import express from "express";
import { Routes } from "./interfaces/router.interface";
import { DB } from "./database/database";
// import cors from 'cors';

export class App {
  public app: express.Application;
  public env: string;
  public port: number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = "development";
    this.port = 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    // this.initializeSwagger();
    // this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    // this.app.use(cors({ origin: 'http://localhost:5173', credentials: CREDENTIALS }));
  }

  private  connectToDatabase() {
     DB.sequelize.sync({ force: false });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }
}
