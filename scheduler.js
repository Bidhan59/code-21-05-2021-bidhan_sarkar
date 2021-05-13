const root = require("app-root-path");
const sendMail = require(`${root}/config/emailServices`);

function sendReminderMail() {
  const mailOptions = {
    from: "noreplyshoppingportal@gmail.com", // sender address
    to: "bidhan.sarkar@incture.com",
    // cc: ,
    subject: "Reminder Email", // Subject line
    text: `Please register asap`, // plaintext body
  };
  sendMail(mailOptions);
}
module.exports = sendReminderMail;
