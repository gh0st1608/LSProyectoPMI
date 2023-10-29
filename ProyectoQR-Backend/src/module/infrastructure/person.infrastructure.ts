import Person from "../domain/person";
import PersonRepository from "../domain/repository/person.repository";
import Model from "./models/person.model";



export default class PersonInfrastructure implements PersonRepository {
  
  async insert(person : Person): Promise<Person> {
    await Model.create(person);
    return person;
  }
  

  async findOne(where: { [s: string]: string | number }): Promise<Person | null> {
    return await Model.findOne(where);
  }
 
   async deleteOne(where: { [s: string]: string | number }): Promise<void> {
    await Model.deleteOne(where);
  }

  async findAll(): Promise<Array<Person>> {
    return await Model.find({}); 
  }

  async findPersonsByParam(where: { [s: string]: string | number }): Promise<Array<Person>> {
    return await Model.find(where); 
  }

  async update(
    where: { [s: number]: number | number },
    data: { [s: string]: string | number }
  ): Promise<Person | null> {
   return await Model.findOneAndUpdate(where, data, {new : true});
  }

  
}
