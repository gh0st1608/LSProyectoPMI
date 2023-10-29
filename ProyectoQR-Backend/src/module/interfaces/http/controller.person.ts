import { Request, Response, response } from "express";
import PersonApplication from "../../application/person.application";
import Person from "../../domain/person";

export default class {
  application: PersonApplication;

  constructor(readonly app: PersonApplication) {
    this.application = app;
    this.insertFile = this.insertFile.bind(this)
    this.getPersonById = this.getPersonById.bind(this)
    this.putPersonById = this.putPersonById.bind(this)
    this.deletePersonById = this.deletePersonById.bind(this)
    this.getPersons = this.getPersons.bind(this);
    this.getPersonByDni = this.getPersonByDni.bind(this);
    this.updatePresence = this.updatePresence.bind(this);
    this.createPerson = this.createPerson.bind(this);
    this.countParticipants = this.countParticipants.bind(this);
  }

  async insertFile(req: Request, res: Response) {
    const f : any = req.files
    f.forEach(async (item : any) => {
      const filename = item.filename
      await this.application.insertFile(filename)
      
    })
    res.json({ message: "Successfully uploaded files" })

    

  }

  async getPersonById(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id)
    const persons = await this.application.getPersonById(id);
    if (persons) {
      res.send(persons);
    } else {
      res.status(404).send("Not found persons");
    }
  }

  async putPersonById(req: Request, res: Response) {
    const { id } = req.params;
    const {documento, nombres, tipoAsistente, email} = req.body;
    console.log(documento)
    const result = await this.application.putPersonById(id,documento,nombres,tipoAsistente,email);
    res.json({personUpd : result})
  }

  async deletePersonById(req: Request, res: Response) {
    const { id } = req.params;
    try{
      await this.application.deletePersonById(id);
      res.sendStatus(200);
    }catch(error){
      res.status(404).send("Not delete persons");
    }
  }
  
  async getPersons(req: Request, res: Response) {

    const persons = await this.application.getPersons();
    if (persons) {
      res.send(persons);
    } else {
      res.status(404).send("Not found persons");
    }
  }


  
  async createPerson(req: Request, res: Response) {
    const {id,documento,nombres,correo,correoCopia,tipoAsistente,categoria,observaciones,comentario} = req.body;
    const person = new Person(
      id,
      documento,
      nombres,
      correo,
      correoCopia,
      tipoAsistente,
      categoria,
      observaciones,
      comentario
    );
    const personInserted = await this.application.create(person);
    
    if (personInserted) {
      res.json({person: personInserted});
    } else {
      res.status(404).send("Person not Created");
    }
  }

  async getPersonByDni(req: Request, res: Response){
    const { documento } = req.body;
    const person = await this.application.getPersonByDni(documento);

    if (person) {
      res.send(person);
    } else {
      res.status(404).send("Not found person");
    }

  }

  async updatePresence(req: Request, res: Response){
    const { id, type, user } = req.body;
    const person = await this.application.updatePresence(id,type,user);
    res.send({asistencia : person?.asistencia})
  }


  async countParticipants(req: Request, res: Response){
    const { user } = req.body;
      const participants = await this.application.countParticipants(user);
      res.send ({cantidad : participants}) 
    
 
  }




}
