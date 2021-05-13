const fast2sms = require("fast-two-sms");
const root = require("app-root-path");
const configModel = require(`${root}/models/notificationConfig`);
const userModel = require(`${root}/models/users`);

function sendReminderSMS(db) {
  let criteria = {
    notification_type: "SMS",
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
              let phone_numbers = data.map((e) => e.phone_no);
              for (let i = 0; i <= 1; i++) {
                let options = {
                  authorization: response[0].options.authorization,
                  message: "TEST NOTIFICATION FOR STACK FINANCE",
                  numbers: phone_numbers,
                };
                fast2sms.sendMessage(options).then((err, response) => {
                  if (err) {
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
module.exports = sendReminderSMS;
