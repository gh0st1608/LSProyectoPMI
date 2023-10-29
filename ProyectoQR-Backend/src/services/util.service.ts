import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import Agenda from "agenda"
import AppService from "../services/app.service";
import EmailsService from "../services/email.service";

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
      const pathSource = path.join(__dirname,'/../')
      const pathQr = pathSource + '/uploads/qr'
      const pathMailing = pathSource + '/resources/mailing'
      const pathCerts = pathSource + '/certs'
      fs.mkdirSync(pathQr,{recursive:true});
      fs.mkdirSync(pathMailing,{recursive:true});
      fs.mkdirSync(pathCerts,{recursive:true});
    }

    static async copyFile() : Promise<void> {
      const pathSourcePdf = path.join(__dirname,'/../../','/src/resources/mailing/programa.pdf')
      const pathSourceHtml = path.join(__dirname,'/../../','/src/resources/mailing/template.html')
      const pathTargetPdf = path.join(__dirname,'/../','/resources/mailing/programa.pdf')
      const pathTargetHtml = path.join(__dirname,'/../','/resources/mailing/template.html')
      const pathSourceCert = path.join(__dirname,'/../../','/src/certs/certificate.crt')
      const pathSourcePriv = path.join(__dirname,'/../../','/src/certs/private.key')
      const pathTargetCert = path.join(__dirname,'/../','/certs/certificate.crt')
      const pathTargetPriv = path.join(__dirname,'/../','/certs/private.key')
      fs.copyFileSync(pathSourcePdf,pathTargetPdf)
      fs.copyFileSync(pathSourceHtml,pathTargetHtml)
      fs.copyFileSync(pathSourceCert,pathTargetCert)
      fs.copyFileSync(pathSourcePriv,pathTargetPriv)
    }

    static async sleep (ms : number){
      return new Promise(resolve => setTimeout(resolve, ms));
  };

  static async jobProcess (arrayCorreos : Array<String>,arrayNombres : Array<String>,arrayQrs : Array<String> ){
    const conDb = `mongodb://${AppService.MONGO_USERNAME}:${AppService.MONGO_PASSWORD}@${AppService.MONGO_HOST}:${AppService.MONGO_PORT}/jobs?authSource=admin`

    const agenda = new Agenda({db: {address: conDb}});
    agenda.define('sendMail', function() : any {
      if (arrayCorreos.length != 0) {
        const emailUlt = arrayCorreos.pop()
        const nombreUlt = arrayNombres.pop()
        const urlQrUlt = arrayQrs.pop()
        EmailsService.sendMailParticipant(emailUlt,nombreUlt,urlQrUlt)
      }else{
        setTimeout(function() {
          agenda.cancel({name: 'sendMail'});
      })
    }
     
    });

    agenda.on('ready', function() {
      agenda.every('20 seconds', 'sendMail');
      agenda.start(); 

      
    });
  }
}
