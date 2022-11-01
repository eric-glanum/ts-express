const express = require("express");
import mysql from "mysql";
import dbConfig from "../src/db/db.config";

import indexRouter from "./routes/index";
const app = express();

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});

app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("connected to server");
});

connection.connect((err) => {
  err
    ? console.log("Error : ", err)
    : console.log("Succesfully connected to DB");
  connection.query(
    `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`,
    (err, res) => {
      err ? console.log("Error : ", err) : res;
    }
  );
});
