import http from "http";
import https from "https";
import fs from "fs";
import { Bootstrap } from "./bootstrap";
import EnvironmentVariables from "../services/app.service";
import { Application } from "express";

export default class extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize(): Promise<boolean | Error> {
    return new Promise<boolean | Error>((resolve, reject) => {
      const server = http.createServer(this.app);
      const serverHttps = https.createServer({
        cert: fs.readFileSync(__dirname + '/../certs/certificate.crt'),
        key: fs.readFileSync(__dirname + '/../certs/private.key')
      },this.app);
      const PORT_HTTP = EnvironmentVariables.PORT_HTTP;
      const PORT_HTTPS = EnvironmentVariables.PORT_HTTPS;

      server
      .listen(PORT_HTTP)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is running on port ${PORT_HTTP}`);
        })
        .on("error", (err: Error) => {
          reject(err);
          console.log(err);
        });

      serverHttps
        .listen(PORT_HTTPS)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is running on port ${PORT_HTTPS}`);
        })
        .on("error", (err: Error) => {
          reject(err);
          console.log(err);
        });
    });
  }
}