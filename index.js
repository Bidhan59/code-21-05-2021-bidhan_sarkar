const express = require("express");
const app = express();
const router = require(`./routes.js`);
const bodyParser = require("body-parser");

async function startApp() {
  app.use(bodyParser.json());
  app.use("/api/v1", router);
  app.listen(3000, function () {
    console.log("SERVER STARTED AT 3000");
  });
  return app;
}
startApp();
