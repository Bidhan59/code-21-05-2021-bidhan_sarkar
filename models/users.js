const appRoot = require("app-root-path");

const requiredParam = require(`${appRoot}/helpers/requiredParams`);
const collectionName = "Users";

const fetchUsers = async ({
  criteria = requiredParam("criteria"),
  db = requiredParam("db"),
}) => {
  const users = await db.collection(collectionName).find(criteria).toArray();
  return users;
};
module.exports = {
  fetchUsers: fetchUsers,
};
