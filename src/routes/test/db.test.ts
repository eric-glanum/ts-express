import { expect, describe, it } from '@jest/globals';
import routes from '../index';
import request from 'supertest';
import indexRouter from '../../routes/index';
import express, { Express } from 'express';

const server = (configure: (express: Express) => void) => {
  const app = express();
  app.use(express.json());
  app.use('/', indexRouter);
  app.listen(3001);
  configure(app);
  return app;
};

describe('POST /getUsers', () => {
  const route = '/getUsers';
  const app = server((app) => {
    app.get(route);
  });
  it('get all users', async () => {
    const response = await request(app).get('/getUsers').expect(200);
    expect(response.status).toEqual(200);
  });
});
