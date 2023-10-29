import AWS from 'aws-sdk'
import EnvironmentVariables from "../services/app.service";


export default class Aws {  

      static async getConfig () : Promise<object> {
        const config = {
          accessKeyId: EnvironmentVariables.AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: EnvironmentVariables.AWS_S3_SECRET_ACCESS_KEY,
          region: EnvironmentVariables.AWS_S3_REGION
        }
        return config
      }

      static async getS3(config : object) : Promise<AWS.S3>{
        return new AWS.S3(config);
      }

    static async uploadToS3(file : Buffer, folder : string, filename : string, extension : string, mimetype : string ) : Promise<string>{
        const s3 = await this.getS3({
          accessKeyId: EnvironmentVariables.AWS_S3_ACCESS_KEY_ID,
          secretAccessKey: EnvironmentVariables.AWS_S3_SECRET_ACCESS_KEY,
          region: EnvironmentVariables.AWS_S3_REGION
        })
        const bucketName = EnvironmentVariables.AWS_S3_BUCKET_NAME;
        const params = {
          Bucket: bucketName,
          Body: file,
          Key: `${folder}/${filename}${extension}`,
          ContentType: mimetype,
        };
        try {
          const url = await s3.upload(params).promise();
          //const url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}/${filename}${extension}`
          return url.Location
        } catch (err) {
          throw err;
          
        }
      };

    static async getUrlFromS3() : Promise<void>{

    }

}
