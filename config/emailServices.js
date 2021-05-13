const nodemailer = require("nodemailer");

const sendMail = (mailData, config) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(config.options);
    if (mailData == null) {
      resolve(false);
    }
    const mailOptions = Object.assign({}, mailData);
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve(false);
      }
      console.log(`Email sent: ${info.response}`);
      resolve(true);
    });
  });
};

module.exports = sendMail;
