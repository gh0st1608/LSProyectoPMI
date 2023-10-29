import express from "express";
import Controller from "./controller.auth";
import PersonApplication from "../../application/auth.application";
import AuthInfrastructure from "../../infrastructure/auth.infrastructure";
import { ErrorsService } from "../../../services/errors.service";
import ValidatorsService from "../../../services/validators.service";
import { authSchema } from "./auth.schema";

const authInfrastructure = new AuthInfrastructure();
const application = new PersonApplication(authInfrastructure);
const controller = new Controller(application);

class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.get(
      "/register",
      ValidatorsService.validate(authSchema.REGISTRY),
      ErrorsService.catchError(controller.register)
      ),
    this.router.post(
      "/login",
      ValidatorsService.validate(authSchema.LOGIN),
      ErrorsService.catchError(controller.login)
      )
    this.router.post(
      "/validate-access-token",
      ValidatorsService.validate(authSchema.VALIDATE_JWT),
      controller.validateAccessToken
    );
    this.router.post(
      "/get-new-access-token",
      ValidatorsService.validate(authSchema.NEW_ACCESS_TOKEN),
      ErrorsService.catchError(controller.getNewAccessToken)
    );
  }
}

export default new Router().router;
