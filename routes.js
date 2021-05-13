const routes = require("express").Router();
const root = require("app-root-path");
const test = require(`${root}/controllers/MailService.js`);

routes.post("/email/sent", test.sendEmail);
module.exports = routes;
