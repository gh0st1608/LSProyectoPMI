import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Vars from './config/vars'

const url = Vars.getApi()

function PersonView() {
    const params = useParams();
    const [personList, setPersonList] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        //On Load
        getPersons();
        console.log("welcome to userview");
    }, []);

    let getPersons = async () => {
        try {
            const person = await axios.get(`${url}/api/get-person/${params.id}`);
            setPersonList(person.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">PersonView</h6>
                </div>
                <div className="card-body">
                    {
                        isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
                            :
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Documento</th>
                                            <th>Nombres</th>
                                            <th>Correo</th>
                                            <th>Tipo Asistente</th>
                                            <th>Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> {personList.documento} </td>
                                            <td>{personList.nombres}</td>
                                            <td>{personList.correo}</td>
                                            <td>{personList.tipoAsistente}</td>
                                            <td>{personList.asistencia}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        </>

    )
}

export default PersonView