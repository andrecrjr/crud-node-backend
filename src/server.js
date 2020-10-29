const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const path = require("path");
const server = require("http").Server(app);
const routes = require("./routes");
const cors = require("cors");
const envFile = process.env.NODE_ENV
  ? path.resolve(__dirname, "../.env.development")
  : "../.env";

let PORT = "8000";
require("dotenv").config({ path: envFile });

app.use(bodyParser.json());
app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  app.use(cors());
  next();
});

app.use("/", routes);

server.listen(PORT, () => {
  require("./models/database");

  console.log(`Connected on port: http://localhost:${PORT}`);
});
