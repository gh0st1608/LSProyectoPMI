import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Vars from './config/vars'

const url = Vars.getApi()

function PersonCreate() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik(
    {
      initialValues: {
        documento: "",
        nombres: "",
        correo: "",
        correoCopia: "",
        tipoAsistente: "",
        categoria: "",
        observaciones: "",
        comentario: ""
      },
     
      // Validating Forms while entering the data
      validate: (values) => {
        let errors = {}           //Validating the form once the error returns empty else onsubmit won't work

        if (!values.documento) {
          errors.documento = "Porfavor ingresar documento";
      } else if (values.documento.length < 8) {
          errors.documento = "Documento no debería ser menor a 8 letras";
      } else if (values.nombres.length > 16) {
          errors.documento = "Documento no debería ser mayor a 15 letras";
      }
      
      if (!values.correo) {
          errors.correo = "Please enter email";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
          errors.correo = 'Invalid email address';
      }


        return errors;
      },
      //one can be able to submit once the validates returns empty value (validation successful) else can't be submitted
      onSubmit: async (values) => {
        console.log(values)
        try {
          setLoading(true);
          await axios.post(`${url}/api/create-person`, values);
          navigate("/portal/person-list");
        } catch (error) {
          console.log(error);
          alert("Validation failed");
          setLoading(false);
        }
      }

    });
  return (
    <div className='container'>

      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>

          <div className="col-lg-6">
            <label>Documento</label>
            <input name='documento' value={myFormik.values.documento} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.documento ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.documento}</span>
          </div>

          <div className="col-lg-6">
            <label>Nombres</label>
            <input name='nombres' value={myFormik.values.nombres} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.nombres ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.nombres}</span>
          </div>

          <div className="col-lg-6">
            <label>Correo</label>
            <input name='correo' value={myFormik.values.correo} onChange={myFormik.handleChange} type={"mail"}
              className={`form-control ${myFormik.errors.correo ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.correo}</span>
          </div>

          <div className="col-lg-6">
            <label>Correo Copia</label>
            <input name='correoCopia' value={myFormik.values.correoCopia} onChange={myFormik.handleChange} type={"mail"}
              className={`form-control ${myFormik.errors.correoCopia ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.correoCopia}</span>
          </div>

          <div className="col-lg-6">
            <label>Tipo de Asistente</label>
            <input name='tipoAsistente' value={myFormik.values.tipoAsistente} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.tipoAsistente ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.tipoAsistente}</span>
          </div>

          <div className="col-lg-6">
            <label>Categoria</label>
            <input name='categoria' value={myFormik.values.categoria} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.categoria ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.categoria}</span>
          </div>

          <div className="col-lg-6">
            <label>Observaciones</label>
            <input name='observaciones' value={myFormik.values.observaciones} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.observaciones ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.observaciones}</span>
          </div>

          <div className="col-lg-6">
            <label>Comentarios</label>
            <input name='comentario' value={myFormik.values.comentario} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.comentario ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.comentario}</span>
          </div>
          {/* <div className="col-lg-6">
            <label>Id</label>
            <input name='id' value={id} type={"text"}
              className={`form-control ${myFormik.errors.id ? "is-invalid" : ""} `} />
          </div> */}
          <div className='col-lg-4 mt-3'>
            <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Create"} className=' btn btn-primary' />
          </div>
        </div>
      </form>
      {/* {JSON.stringify(myFormik.values)} */}
    </div>
  );
}

export default PersonCreate