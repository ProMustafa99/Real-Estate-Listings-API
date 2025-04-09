import { App } from "./app";
import "reflect-metadata";
import { realEstateRoute } from "./route/realestate.route";


const app = new App([new realEstateRoute()]);

app.listen();