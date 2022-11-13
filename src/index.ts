import express from 'express';
import mysql from 'mysql';
import dbConfig from '../src/db/db.config';
import indexRouter from './routes/index';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';

class User {
  id!: number;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
}

declare module 'express-session' {
  interface SessionData {
    user: User;
  }
}

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);
// app.use(
//   session({
//     secret: 'a4f8071f-c873-4447-8ee2',
//     resave: false,
//     saveUninitialized: false,
//   })
// );
app.use(
  cookieSession({
    name: 'cookie dough',
    keys: ['hello-cookies'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

export const connection = mysql.createConnection({
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

export const server = app.listen(3000, () => {
  console.log('connected to server');
});

export default app;
