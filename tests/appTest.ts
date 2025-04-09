// appTest.ts

import { App } from "../src/app";
import { realEstateRoute } from "../src/route/realestate.route";

const appInstance = new App([new realEstateRoute()]);
export default appInstance.app;
