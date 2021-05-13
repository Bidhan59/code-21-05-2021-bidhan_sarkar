const appRoot = require("app-root-path");

const requiredParam = require(`${appRoot}/helpers/requiredParams`);
const collectionName = "NotificationConfig";

const fetchConfig = async ({
  criteria = requiredParam("criteria"),
  db = requiredParam("db"),
}) => {
  const config = await db.collection(collectionName).find(criteria).toArray();
  return config;
};
module.exports = {
  fetchConfig: fetchConfig,
};
