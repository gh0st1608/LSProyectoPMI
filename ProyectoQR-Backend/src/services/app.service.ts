import yenv from "yenv";
const env = yenv();

export default class {
  static get PORT_HTTP(): number {
    return process.env.PORT_HTTP || env.PORT_HTTP || 4000;
  }

  static get PORT_HTTPS(): number {
    return process.env.PORT_HTTPS || env.PORT_HTTPS || 4001;
  }

  static get HOSTNAME(): number {
    return process.env.HOSTNAME || env.HOSTNAME || 'https://localhost';
  }

  static get MONGO_HOST(): string {
    return process.env.MONGO_HOST || env.DATABASE.MONGO.HOST || "127.0.0.1";
  }

  static get MONGO_PORT(): number {
    return process.env.MONGO_PORT || env.DATABASE.MONGO.PORT || 27017;
  }

  static get MONGO_USERNAME(): string {
    return process.env.MONGO_USERNAME || env.DATABASE.MONGO.USERNAME || "root";
  }

  static get MONGO_PASSWORD(): string {
    return process.env.MONGO_PASSWORD || env.DATABASE.MONGO.PASSWORD || "12345";
  }

  static get TOKEN_TIMEOUT(): number {
    return process.env.TOKEN_TIMEOUT || env.TOKEN.TIMEOUT || 15;
  }

  static get TOKEN_SECRET_WORD(): string {
    return process.env.TOKEN_SECRET_WORD || env.TOKEN.SECRET_WORD || "AMERICA";
  }

  static get AWS_S3_ACCESS_KEY_ID(): string {
    return process.env.AWS_S3_ACCESS_KEY_ID || env.AWS.AWS_S3_ACCESS_KEY_ID || "AKIARFH2MTWNLF7J2ZEE";
  }

  static get AWS_S3_SECRET_ACCESS_KEY(): string {
    return process.env.AWS_S3_SECRET_ACCESS_KEY || env.AWS.AWS_S3_SECRET_ACCESS_KEY || "nahbjAk+HINAoxAHP6DUqnJSaT8MCfpxiICo7EHE";
  }

  static get AWS_S3_BUCKET_NAME(): string {
    return process.env.AWS_S3_BUCKET_NAME || env.AWS.AWS_S3_BUCKET_NAME || "proyectoqrdev";
  }

  static get AWS_S3_REGION(): string {
    return process.env.AWS_S3_REGION || env.AWS.AWS_S3_REGION || "us-east-1";
  }

  static get MAIL_HOST(): string {
    return process.env.MAIL_HOST || env.MAIL.HOST || "sandbox.smtp.mailtrap.io";
  }

  static get MAIL_PORT(): number {
    return process.env.MAIL_PORT || env.MAIL.PORT || 587;
  }

  static get MAIL_USERNAME(): string {
    return process.env.MAIL_USERNAME || env.MAIL.USERNAME || "83c14c4fc4e926";
  }

  static get MAIL_PASSWORD(): string {
    return process.env.MAIL_PASSWORD || env.MAIL.PASSWORD || "85bf74e8796950";
  }

}