"use strict";
const mongoose = require("mongoose");

mongoose.connect(`${process.env.MONGO_PATH}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
//start database in windows: "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe" --dbpath="c:\database\db"

let db = mongoose.connection;
db.on("error", () => {
  console.error.bind(console, "connection error:");
});

db.once("open", () => {
  console.log("Mongo Connected!");
  console.log("ENVIROMENT:", process.env.NODE_ENV);
});

module.exports = db;
