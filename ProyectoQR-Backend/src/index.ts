import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import PersonInfrastructure from "./module/infrastructure/person.infrastructure";
import PersonApplication from "./module/application/person.application";
import app from "./app";

const personInfrastructure = new PersonInfrastructure();
const personApplication = new PersonApplication(
  personInfrastructure
);

(async () => {
  try {
    const listPromises = [];

    const serverBootstrap = new ServerBootstrap(app);
    const databaseBootstrap = new DatabaseBootstrap();

    listPromises.push(serverBootstrap.initialize());
    listPromises.push(databaseBootstrap.initialize());

    await Promise.all(listPromises);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();