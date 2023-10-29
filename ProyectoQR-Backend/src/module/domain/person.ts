//export type STATUS = "REGISTRADO" | "ASISTIDO" | "AUSENTE";
import {uuid}  from "uuidv4"

export default class Person {
   readonly id?:string;
   readonly documento: string;
   readonly nombres: string;
   readonly correo: string;
   readonly correoCopia: string;
   readonly tipoAsistente: string;
   readonly categoria: string;
   readonly observaciones: string;
   readonly comentario: string;
   readonly asistencia: string;
   readonly user: string;
   urlQr: string;

  constructor(
    id: string = uuid(),
    documento: string,
    nombres: string,
    correo: string,
    correoCopia: string,
    tipoAsistente: string,
    categoria: string,
    observaciones: string,
    comentario: string,
    asistencia: string = 'R',
    user: string = '',
    urlQr: string = '',
  ) {
    this.id = id;
    this.documento = documento;
    this.nombres = nombres;
    this.correo = correo;
    this.correoCopia = correoCopia;
    this.tipoAsistente = tipoAsistente;
    this.categoria = categoria;
    this.observaciones = observaciones;
    this.comentario = comentario;
    this.asistencia = asistencia;
    this.user = user;
    this.urlQr = urlQr;
  }

  static async incremental() {

  }

}
