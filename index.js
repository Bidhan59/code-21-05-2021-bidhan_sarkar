const express = require("express");
const app = express();
const router = require(`./routes.js`);
const bodyParser = require("body-parser");
const config = require("./config");
const scheduler = require("./services/schedulers");

async function startApp() {
  app.use(bodyParser.json());
  const db = await config.getDB();
  if (db == null) {
    console.log(`DB cannot be connected Stopping the APP`);
    process.exit(1);
  }
  app.use(bodyParser.urlencoded({ extended: false }));
  scheduler.schedulerInit(db);
  app.use((req, res, next) => {
    req.db = {
      TestDB: db.database,
      client: db.client,
    };
    next();
  });
  app.use("/api/v1", router);
  app.listen(3000, function () {
    console.log("SERVER STARTED AT 3000");
  });
  return app;
}
startApp();
