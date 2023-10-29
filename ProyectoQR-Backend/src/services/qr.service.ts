import qr_code from "qrcode";
import path from 'path';
import fs from 'fs';
import AwsServices from "../services/aws.service";


export default class Qr {

    static async makeFileQr (documento: string) : Promise<void> {
        try {
            const file_path = path.join(__dirname,'/../uploads/qr/',documento + ".png")
            await qr_code.toFile(file_path,documento,{
                
                color : {
                    dark: '#000',  // Black dots
                    light: '#FFFFFFFF' // Transparent background
                }
            })
        } catch(error:any){
            console.log(error)
        }
        
    }

    static async saveQrToS3 (documento: string) : Promise<string>{
            const file_path = path.join(__dirname,'/../uploads/qr/',documento + ".png")
            const data = fs.readFileSync(file_path)
            const urlS3 = await AwsServices.uploadToS3(data,'qr',documento,'.png','image/png')
            return urlS3
        }

}
