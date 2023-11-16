import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Vars from './config/vars'

const url = Vars.getApi()

function PersonEdit() {
    const params = useParams();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        getPersonData()
    }, [])

    let getPersonData = async () => {
        try {
            const person = await axios.get(`${url}/get-person/${params.id}`);
            myFormik.setValues(person.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const myFormik = useFormik({
        initialValues: {
            documento: "",
            nombres: "",
            correo: "",
            tipoAsistente: "",
        },
        // Validating Forms while entering the data
        validate: (values) => {
            let errors = {}           //Validating the form once the error returns empty else onsubmit won't work
            
            if (!values.documento) {
                errors.documento = "Porfavor ingresar documento";
            } else if (values.documento.length < 8) {
                errors.documento = "Documento no debería ser menor a 8 letras";
            } else if (values.documento.length > 16) {
                errors.documento = "Documento no debería ser mayor a 15 letras";
            }
            
            if (!values.correo) {
                errors.correo = "Please enter email";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
                errors.correo = 'Invalid email address';
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                setLoading(true);
                const obj = {documento: values.documento, nombres: values.nombres, correo: values.correo, tipoAsistente: values.tipoAsistente}
                await axios.put(`${url}/put-person/${params.id}`, obj);
                setLoading(false);
                navigate("/portal/person-list")
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    })
    return (
        <>
            <h3>PersonEdit - Id : {params.id} </h3>
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
                            <label>Tipo Asistente</label>
                            <input name='tipoAsistente' value={myFormik.values.tipoAsistente} onChange={myFormik.handleChange} type={"text"}
                                className={`form-control ${myFormik.errors.tipoAsistente ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.tipoAsistente}</span>
                        </div>

                        <div className="col-lg-6">
                            <label>E-Mail</label>
                            <input name='correo' value={myFormik.values.correo} onChange={myFormik.handleChange} type={"mail"}
                                className={`form-control ${myFormik.errors.correo ? "is-invalid" : ""} `} />
                            <span style={{ color: "red" }}>{myFormik.errors.correo}</span>
                        </div>

                        <div className='col-lg-4 mt-3'>
                            <input disabled={isLoading} type="submit" value={isLoading ? "Updating..." : "Update"} className=' btn btn-primary' />
                        </div>
                    </div>
                </form>
                {/* {JSON.stringify(myFormik.values)} */}
            </div>
        </>


    )
}

export default PersonEdit