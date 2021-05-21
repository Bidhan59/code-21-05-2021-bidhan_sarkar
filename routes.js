const routes = require("express").Router();
const root = require("app-root-path");
const test = require(`${root}/controllers/ProcessData.js`);

routes.post("/process/data", test.processData);
module.exports = routes;
