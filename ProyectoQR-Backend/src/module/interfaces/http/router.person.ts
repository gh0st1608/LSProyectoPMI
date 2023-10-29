import express from "express";
import multer  from "multer"
import path from "path";
import Controller from "./controller.person";
import PersonApplication from "../../application/person.application";
import PersonInfrastructure from "../../infrastructure/person.infrastructure";
import { ErrorsService } from "../../../services/errors.service";
import ValidatorsService from "../../../services/validators.service";
import UtilsService from "../../../services/util.service";
import { personSchema } from "./person.schema";
UtilsService.makeDirs()
UtilsService.copyFile()
const pathXlsx = path.join(__dirname,'/../../../uploads/files/')
const upload = multer({ dest: pathXlsx });

const personInfrastructure = new PersonInfrastructure();
const application = new PersonApplication(personInfrastructure);
const controller = new Controller(application);

class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post(
      "/insert-file",
      upload.array('files'),
      controller.insertFile
    );
    this.router.get(
      "/get-person/:id",
      ValidatorsService.validate(personSchema.GETPERSONBYID),
      ErrorsService.catchError(controller.getPersonById)
    );
    this.router.put(
      "/put-person/:id",
      ValidatorsService.validate(personSchema.PUTPERSONBYID),
      ErrorsService.catchError(controller.putPersonById)
    );
    this.router.delete(
      "/delete-person/:id",
      ValidatorsService.validate(personSchema.GETPERSONBYID),
      ErrorsService.catchError(controller.deletePersonById)
    );
    this.router.get(
      "/get-persons",
      ErrorsService.catchError(controller.getPersons)
    );
    this.router.post(
      "/create-person",
      ValidatorsService.validate(personSchema.CREATEPERSON),
      ErrorsService.catchError(controller.createPerson)
    );
    this.router.post(
      "/get-person",
      ValidatorsService.validate(personSchema.GETPERSONBYDNI),
      ErrorsService.catchError(controller.getPersonByDni)
    );
    this.router.post(
      "/update-person",
      ValidatorsService.validate(personSchema.UPDATEPERSON),
      ErrorsService.catchError(controller.updatePresence),
    );
    this.router.post(
      "/count-participants",
      ValidatorsService.validate(personSchema.COUNTPERSONBYUSER),
      ErrorsService.catchError(controller.countParticipants)
    );
    this.router.post(
      "/count-register",
      ValidatorsService.validate(personSchema.COUNTPERSONBYUSER),
      ErrorsService.catchError(controller.countParticipants)
    );
  }
}

export default new Router().router;
