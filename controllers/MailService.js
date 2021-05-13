const root = require("app-root-path");
const _ = require("lodash");
const configModel = require(`${root}/models/notificationConfig`);
const serviceSendMail = require(`${root}/config/serviceEmailServices`);

async function sendEmail(req, res, next) {
  const orgDB = req.db.TestDB;
  const body = req.body;
  if (_.isNil(body.EmailTo) || _.isNil(body.Subject) || _.isNil(body.Text)) {
    return res.status(404).json({
      status: "Failure",
      statusCode: 404,
      message: "MANDETORY FIELDS ARE MISSING",
    });
  }
  const config = await configModel
    .fetchConfig({
      criteria: { notification_type: "EMAIL" },
      db: orgDB,
    })
    .catch((err) => {
      return res.status(400).json({
        status: "Failure",
        statusCode: 400,
        message: "ERROR IN FETCHING CONFIGURATION",
      });
    });
  const mailOptions = {
    from: config[0].from, // sender address
    to: body.EmailTo,
    cc: body.cc ? body.cc : "",
    subject: body.Subject, // Subject line
    text: body.Text, // plaintext body
  };
  let result = await serviceSendMail.sendMail(mailOptions, config[0]);
  if (result == false) {
    return res.status(400).json({
      status: "Failure",
      statusCode: 400,
      message: "EMAIL NOT SEND",
    });
  }
  return res.status(200).json({
    status: "success",
    statusCode: 200,
    message: `EMAIL SENT`,
  });
}

module.exports = {
  sendEmail: sendEmail,
};
