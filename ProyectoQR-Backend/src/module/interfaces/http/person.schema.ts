import joi from "joi";

export const personSchema = {
  CREATEPERSON: {
    body: joi.object({
      documento: joi.string().allow(null, ''),
      nombres: joi.string().allow(null, ''),
      correo: joi.string().allow(null, ''),
      correoCopia: joi.string().allow(null, ''),
      tipoAsistente: joi.string().allow(null, ''),
      categoria: joi.string().allow(null, ''),
      observaciones: joi.string().allow(null, ''),
      comentario: joi.string().allow(null, ''),
    }),
  },
  UPDATEPERSON: {
    body: joi.object({
      id: joi.string().allow(null, ''),
      type: joi.string().allow(null,''),
      user: joi.string().allow(null,''),
    }),
  },
  COUNTPERSONBYUSER: {
    body: joi.object({
      user: joi.string().allow(null,''),
    }),
  },
  GETPERSONBYDNI: {
    body: joi.object({
      documento: joi.string().allow(null, ''),
    }),
  },
  GETPERSONBYID: {
    body: joi.object({
      id: joi.string().allow(null, ''),
    }),
  },
  PUTPERSONBYID: {
    body: joi.object({
      documento: joi.string().allow(null, ''),
      nombres: joi.string().allow(null, ''),
      tipoAsistente: joi.string().allow(null, ''),
      correo: joi.string().allow(null, ''),
    }),
  },
};
