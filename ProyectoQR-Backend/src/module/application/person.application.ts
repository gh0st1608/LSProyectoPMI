import Person from "../domain/person";
import PersonRepository from "../domain/repository/person.repository";
import QrService from "../../services/qr.service";
import UtilService from "../../services/util.service";



export default class PersonApplication {
  readonly repositoryPerson: PersonRepository;

  constructor(
    repositoryPerson: PersonRepository,
  ) {
    this.repositoryPerson = repositoryPerson;
  }

  

  async insertFile(filename : any) : Promise<void>{
    const jsonFile = await UtilService.readFile(filename);
    console.log(jsonFile)
    jsonFile.forEach(async (item : Person) => {
      const objPerson = new Person(
        item.id,
        item.documento,
        item.nombres,
        item.correo,
        item.correoCopia,
        item.tipoAsistente,
        item.categoria,
        item.observaciones,
        item.comentario
        )
        await QrService.makeFileQr(objPerson.documento.toString())
        objPerson.urlQr = await QrService.saveQrToS3(objPerson.documento.toString())
        await this.create(objPerson)  
    })
    console.log('ANTES DE ENTRAR AL JOBSENDMAIL')
    await UtilService.sleep(10000)
    await this.jobSendMail()
  }

  async jobSendMail() {
    const filtro = { asistencia : "R" }
    const persons = await this.repositoryPerson.findPersonsByParam(filtro)
    const arrayCorreos = new Array<String>
    const arrayNombres = new Array<String>
    const arrayQrs = new Array<String>  
    persons.forEach((item) => {
      arrayCorreos.push(item.correo)
      arrayNombres.push(item.nombres)
      arrayQrs.push(item.urlQr)
    })
    console.log('ENTRO AL JOBSENDMANIL')
    await UtilService.jobProcess(arrayCorreos,arrayNombres,arrayQrs)
    
  }


  async  create(person: Person): Promise<Person> {
    const result = await this.repositoryPerson.insert(person);
    return result;
  }
  
  async getPersonById(id : string): Promise<Person | null> {
    const result = await this.repositoryPerson.findOne({id});
    return result;
  }

  async putPersonById(id : string, documento :string, nombres : string, tipoAsistente : string, email : string): Promise<Person | null> {
    const filter = {id : id}
    const update = { documento: documento, nombres: nombres, tipoAsistente:tipoAsistente, email: email}
    return await this.repositoryPerson.update(filter,update);
  }

  async deletePersonById(id : string): Promise<void> {
    await this.repositoryPerson.deleteOne({id});
  }
    
  async getPersons(): Promise<Array<Person> | null> {
    const result = await this.repositoryPerson.findAll();
    return result;
  }

  

  async getPersonByDni(documento : string): Promise<Person | null> {
    const result = await this.repositoryPerson.findOne({documento});
    return result;
  }

  async updatePresence(id : string, type: string, user :string): Promise<Person | null> {
    const filterId = { id : id }
    const update = { asistencia : 'A', type : type, user: user }
    return await this.repositoryPerson.update(filterId,update);
  }


  async countParticipants(user : string) : Promise<Number | null>{
    if(user == undefined) {
      const filtro = {}
      const persons = await this.repositoryPerson.findPersonsByParam(filtro)
      return persons.length
    }else{
      const persons = await this.repositoryPerson.findPersonsByParam({user})
      return persons.length
    }
    
  }

}
