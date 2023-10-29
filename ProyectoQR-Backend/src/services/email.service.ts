import nodemailer from 'nodemailer'
import EnvironmentVariables from "../services/app.service";
import fs from "fs";
import path  from 'path';
import handlebars from "handlebars";



export default class Email {

    static async createTransport(options : Object) : Promise<void> {
        // Configurar el correo electrónico
        const smtpTransporter = nodemailer.createTransport({
            host: EnvironmentVariables.MAIL_HOST,
            port: EnvironmentVariables.MAIL_PORT,
            secure: false,
            auth: {
                user: EnvironmentVariables.MAIL_USERNAME,
                pass: EnvironmentVariables.MAIL_PASSWORD,
            },
        });
            await smtpTransporter.sendMail(options)

      };

    static async sendMailParticipant(correoTarget : any, userTarget : any | undefined, urlImg: any){
        const pathHtml =  path.join(__dirname,'/../resources/mailing/',"template.html")
        const pathAttachment =  path.join(__dirname,'/../resources/mailing/',"programa.pdf")

        
        fs.readFile(pathHtml,'utf-8',async (error,html) => {
            try {
                const  template = handlebars.compile(html)
                const replacements = {
                    username: `${userTarget}`,
                    imageQr : urlImg,
               };
                const htmlToSend = template(replacements).replace('${pathqr}',urlImg);
                const options = {
                    from : `CONGRESO INTERNACIONAL ${EnvironmentVariables.MAIL_USERNAME}`,
                    to : `${correoTarget}`,
                    subject : 'XV Congreso Internacional de Dirección de Proyectos PMI 2023 ',
                    html : htmlToSend,
                    attachments: [
                        {
                            filename: 'programa.pdf',
                            path: pathAttachment
                        }
                    ]
                }

               await this.createTransport(options)
               
            }catch(e){
                console.log(error)
            }
        })
        

    }
      

}
