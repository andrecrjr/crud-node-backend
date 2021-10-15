const express = require("express");
const app = new express();
const bodyParser = require("body-parser");
const path = require("path");
const server = require("http").Server(app);
const routes = require("./routes");
const cors = require("cors");

let PORT = "8000";

process.env.NODE_ENV === "dev" &&
	require("dotenv").config({
		path: path.resolve(__dirname, "../.env.development"),
	});

app.use(bodyParser.json());
app.options("*", cors());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Expose-Headers", "*");
	res.header("Content-Range", "bytes : 0-100/*");
	app.use(cors());
	next();
});

app.use("/", routes);

server.listen(PORT, () => {
	require("./models/database");

	console.log(`Connected on port: http://localhost:${PORT}`);
});
