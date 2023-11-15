import express, { Application, Request, Response } from "express";
import routerPerson from "./module/interfaces/http/router.person";
import routerAuth from "./module/interfaces/http/router.auth";
import path from "path"
import cors  from "cors";
import { ErrorsService } from "./services/errors.service";

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
    this.mountErrors();
  }



  middlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(cors());
    this.expressApp.options('*', cors());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  
  mountRoutes() {
    this.expressApp.use("/", routerPerson,routerAuth);
    this.expressApp.use('/static',express.static(path.join(__dirname, 'uploads/qr/')))
    this.expressApp.get("/ping", (req: Request, res: Response) => {
      res.send("All's ok");
    });
  }

  mountErrors() {
    this.expressApp.use(ErrorsService.notFound);
    this.expressApp.use(ErrorsService.generic);
  }
}

export default new App().expressApp;