import React, {useState} from 'react'
import axios from 'axios';
import Vars from './config/vars'

const url = Vars.getApi()

function UploadFile() {
    const [archivos,setArchivos] = useState(null)
    const subirArchivos = e =>{
        setArchivos(e)
    }

    const insertarArchivos = async () => {
        const files = new FormData();

        for (let index = 0; index < archivos.length; index++){
            console.log(archivos[index])
            files.append("files",archivos[index]);
        }
        console.log(files)
        await axios.post(`${url}/api/insert-file`,files,{headers:{'Content-type' : 'multipart/form-data'}})
        .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })
    }

  

    return (
        <div className="App">
            <br></br>
            <input type="file" name="files" multiple onChange={(e) => subirArchivos(e.target.files)}></input>
            <br></br>
            <button className=' btn btn-primary' onClick={() => insertarArchivos()}> Insertar Archivos</button>
        </div>
        
    )


}


export default UploadFile