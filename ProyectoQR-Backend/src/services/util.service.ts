import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import Agenda, {Job} from "agenda"
import AppService from "../services/app.service";
import EmailsService from "../services/email.service";

interface EmailJob{
  email: string;
  nombre: string;
  urlQr: string;
}
export default class Util {

    static async readFile (filename: string) : Promise<any> {
        try {
            const file_path = path.join(__dirname,'/../uploads/files/',filename)
            const excel = XLSX.readFile(file_path);
            const nombreHoja = excel.SheetNames; // regresa un array
            const datos : any = XLSX.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);

            const jDatos = [];
            for (let i = 0; i < datos.length; i++) {
              const dato = datos[i];
              jDatos.push({
                ...dato
              });
            }
            return jDatos
        } catch(error:any){
            console.log(error)
        }
        
    }

    static async makeDirs() : Promise<void> {
      const pathSource = path.join(__dirname,'..')
      const pathQr = pathSource + '/uploads/qr'
      const pathMailing = pathSource + '/resources/mailing'
      fs.mkdirSync(pathQr,{recursive:true});
      fs.mkdirSync(pathMailing,{recursive:true});
    }

    static async copyFile() : Promise<void> {
      const pathSourcePdf = path.join(__dirname,'..','..','/src/resources/mailing/programa.pdf')
      const pathSourceHtml = path.join(__dirname,'..','..','/src/resources/mailing/template.html')
      const pathTargetPdf = path.join(__dirname,'..','/resources/mailing/programa.pdf')
      const pathTargetHtml = path.join(__dirname,'..','/resources/mailing/template.html')
      fs.copyFileSync(pathSourcePdf,pathTargetPdf)
      fs.copyFileSync(pathSourceHtml,pathTargetHtml)
    }

    static async sleep (ms : number){
      return new Promise(resolve => setTimeout(resolve, ms));
  };
  static async jobProcess (arrayCorreos : Array<String>, arrayNombres : Array<String>,arrayQrs : Array<String>, iteraciones : number ){
    const conDb = AppService.MONGO_HOST == '127.0.0.1' || AppService.MONGO_HOST == 'mongo-app-backend-qr-dev'
      ? `mongodb://${AppService.MONGO_USERNAME}:${AppService.MONGO_PASSWORD}@${AppService.MONGO_HOST}:${AppService.MONGO_PORT}/asistencia?authSource=admin&retryWrites=true&w=majority`
      : `mongodb+srv://${AppService.MONGO_USERNAME}:${AppService.MONGO_PASSWORD}@${AppService.MONGO_HOST}/asistencia?authSource=admin&retryWrites=true&w=majority`
    

    const agenda = new Agenda({db: {address: conDb}});
    agenda.define('send-email', { concurrency: 1 }, async function(job: Job<EmailJob>) : Promise<void> {
      console.log("Running at", new Date(), job.attrs.data)
      const { email, nombre, urlQr } = job.attrs.data;
      await EmailsService.sendMailParticipant(email, nombre, urlQr)
    })
    await agenda.start()
    for(let i =0; i < iteraciones; i ++){
      await agenda.schedule(`in ${i*10} seconds`, "send-email", {
        email: arrayCorreos[i],
        nombre: arrayNombres[i],
        urlQr: arrayQrs[i] 
      })
    }
  }
}
