import express from 'express';
import mysql from 'mysql';
import dbConfig from '../src/db/db.config';
import indexRouter from './routes/index';
import { Express } from 'express-serve-static-core';

const app = express();

app.use(express.json());
app.use('/', indexRouter);

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
});
connection.connect((err: any) => {
  err ? console.log('Error[connection.connect] : ', err.message) : console.log('Succesfully connected to DB');
  connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`, (err, res) => {
    err ? console.log('Error[connection.query] : ', err.message) : res;
  });
});

app.listen(3000, () => {
  console.log('connected to server');
});
