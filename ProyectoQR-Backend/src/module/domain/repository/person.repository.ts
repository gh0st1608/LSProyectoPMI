import Person from "../person";
export default interface PersonRepository {
  insert(person: Person): Promise<Person>;
  findAll(): Promise<Array<Person>>;
  findPersonsByParam(where: { [s: string]: string | number }): Promise<Array<Person>>;
  findOne(where: { [s: string]: string | number }): Promise<Person | null>;
  deleteOne(where: { [s: string]: string | number }): Promise<void>;
  update(where: { [s: string]: string | number },data: { [s: string]: string | number }): Promise<Person | null>;
}
