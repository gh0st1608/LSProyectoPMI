import mongoose,  { Schema, Model, Document } from "mongoose";

class PersonModel {
  private readonly personSchema: Schema;

  constructor() {
    this.personSchema = new Schema({
      id: {
        type: String,
        required: false,
        trim: true
      },
      documento: {
        type: String,
        required: true,
        trim: true
      },
      nombres: {
        type: String,
        trim: true
      },
      correo: {
        type: String,
        trim: true
      },
      correoCopia: {
        type: String,
        trim: false
      },
      tipoAsistente: {
        type: String,
        required: false,
      },
      categoria: {
        type: String,
        required: false,
      },
      observaciones:
      {
        type: String,
        required: false,
      },
      comentario:
      {
        type: String,
        required: false,
      },
      asistencia:
      {
        type: String,
        required: false,
      },
      user:
      {
        type: String,
        required: false,
      },
      urlQr:
      {
        type: String,
        required: false,
      },
      fecha_envio_mail:
      {
        type: Date,
        required: false,
      },
      fecha_registro_asistencia:
      {
        type: Date,
        required: false,
      },
      
    },
    { 
      collection: 'person' 
    });
  }

  get model(): Model<any> {
    return mongoose.model("Person", this.personSchema);
  }
}

export default new PersonModel().model;
