const root = require("app-root-path");
const sendMail = require(`${root}/config/emailServices`);
const configModel = require(`${root}/models/notificationConfig`);
const userModel = require(`${root}/models/users`);

function sendReminderMail(db) {
  let criteria = {
    notification_type: "EMAIL",
  };
  configModel
    .fetchConfig({
      criteria: criteria,
      db: db.database,
    })
    .then((response) => {
      if (response.length > 0) {
        userModel
          .fetchUsers({
            criteria: { is_active: true },
            db: db.database,
          })
          .then((data) => {
            if (data.length > 0) {
              let emails = data.map((e) => e.user_email);
              const mailOptions = {
                from: response[0].from, // sender address
                to: emails,
                subject: "NOTIFICATION MAIL", // Subject line
                text: `Please register asap`, // plaintext body
              };
              var i;
              for (i = 0; i <= 1; i++) {
                sendMail(mailOptions, response[0]).then((response) => {
                  if (response == false) {
                    i = 0;
                  } else {
                    i = 2;
                  }
                });
              }
            }
          })
          .catch(function (err) {
            console.log("ERROR IN FETCHING USER DATA ", err);
          });
      }
    })
    .catch(function (err) {
      console.log("ERROR IN FETCHING CONFIG DATA ", err);
    });
}
module.exports = sendReminderMail;
