//package
require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const CookieParser = require("cookieparser");
//db
const dbconn = require("./db/dbconnect");

//env
const env = process.env;

//port
let port = env.PORT || 5000;

//middleware
const ErrorHandler = require("./middleware/error");

//routing import
let product = require("./routing/product");
let user = require("./routing/user");
//middleware
app.use(express.json());
app.use(cors());
app.get('*',checkuser)
//routing
app.use("/api/v1", product);
 app.use("/api/v1", user);
// app.use('/api/v1',order)
// app.use('/api/v1',payment)
app.use(ErrorHandler);
process.on("uncaughtException", (err) => {
  console.log(`error: ${err.message}`);
  console.log("shuting down the server due to an unhandle rejection");
  process.exit(1);
});
process.on("unhandledRejection", (err) => {
  console.log(`error: ${err.message}`);
  console.log("shuting down the server due to an unhandle rejection");
  server.close(() => {
    process.exit(1);
  });
});
process.setMaxListeners(0);
dbconn(env.MONGO_URI, port, app);
