const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(mailData, config) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config.options);

  // send mail with defined transport object
  try {
    let info = await transporter.sendMail(mailData);
    return true;
  } catch (err) {
    return false;
  }
}
module.exports = {
  sendMail: sendMail,
};
