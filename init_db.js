function initDB(IncreamentalId) {
  console.log("hello world");
}

const mongoose = require("mongoose");
const IncreamentalId = require("./models/increamental_id.js");

const thisid = new IncreamentalId();
thisid.id = 0;
async function createId() {
  try {
    console.log("hello world");
    const response = await thisid.save();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
createId();

module.exports = initDB;
