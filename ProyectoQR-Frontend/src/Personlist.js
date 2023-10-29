import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Vars from './config/vars'

const url = Vars.getApi()

function Personlist() {

  const [personList, setPersonList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  //const objApi = new Vars();
  
  
  
  useEffect(() => {
    //On Load
    getPersons();
    console.log("welcome");
  }, []);

  let getPersons = async () => {

    try {
      
      const persons = await axios.get(`${url}/api/get-persons`);
      setPersonList(persons.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  let handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure do you want to delete the data?");
      if (confirmDelete) {
        await axios.delete(`${url}/api/delete-person/${id}`);
        getPersons();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Person-List</h1>
        <Link to="/portal/person-create" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
          <FontAwesomeIcon icon={faUser} className="creatinguser mr-2" />
          Create Person
        </Link>
      </div>
      {/* <!-- DataTables --> */}
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">DataTables</h6>
        </div>
        <div className="card-body">
          {
            isLoading ? <img src='https://media.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.gif' />
              : <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Nombres</th>
                      <th>Correo</th>
                      <th>CorreoCopia</th>
                      <th>Tipo Asistente</th>
                      <th>Asistencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {personList.map((person) => {
                      return (
                        <tr>
                          <td>{person.documento}</td>
                          <td>{person.nombres}</td>
                          <td>{person.correo}</td>
                          <td>{person.correoCopia}</td>
                          <td>{person.tipoAsistente}</td>
                          <td>{person.asistencia}</td>
                          <th>
                            <Link to={`/portal/person-view/${person.id}`} className='btn btn-primary btn-sm mr-1'>View</Link>
                            <Link to={`/portal/person-edit/${person.id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
                            <button onClick={() => handleDelete(person.id)} className='btn btn-danger btn-sm mr-1'>Delete</button>
                          </th>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
          }

        </div>
      </div>
    </>
  )
}

export default Personlist