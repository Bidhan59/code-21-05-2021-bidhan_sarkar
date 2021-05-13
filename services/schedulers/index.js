const { CronJob } = require("cron");
const dailyMailNotificationS = require("./notificationEmailService");
const dailySmsNotificationS = require("./notificationSMSService");
let db = "";

const dailyMailNotificationScheduler = new CronJob("0 0 1 * * *", () => {
  dailyMailNotificationS(db);
});
const dailyWhatsappNotificationScheduler = new CronJob("0 0 1 * * *", () => {
  dailySmsNotificationS(db);
});
const schedulerInit = (appDB) => {
  if (appDB == null) {
    throw new Error("DB is need for the scheduler to RUN");
  }
  console.log("Registering the Scheduler for run");
  db = appDB;
  // testScheduler.start();
  console.log("starting Daily notification Scheduler");
  dailyMailNotificationScheduler.start();
  dailyWhatsappNotificationScheduler.start();
};

module.exports = Object.assign({}, { schedulerInit });
