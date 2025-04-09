import { App } from "./app";
import { CommentsRoute } from "./route/comments.route";
import "reflect-metadata";


const app = new App([new CommentsRoute]);

app.listen();