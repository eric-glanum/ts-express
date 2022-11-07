import { expect, describe, it } from '@jest/globals';
import request from 'supertest';
import app from '../../index';

describe('TEST ENDPOINTS', () => {
  it('get all users /getUsers', async () => {
    const response = await request(app).get('/getUsers').expect(200);
    expect(response.status).toEqual(200);
  });

  it('create an user', async () => {
    const response = await request(app).post('/createUser').send({ name: 'John', email: 'john@doe.fr' });
    expect(response.status).toEqual(200);
  });

  it.skip('get one user /getUser/:id', async () => {
    const response = await request(app).get('/getUser/11').expect(200);
    expect(response.status).toEqual(200);
  });

  it.skip('delete one user /deleteUser/:id', async () => {
    const response = await request(app).delete('/deleteUser/11').expect(200);
    expect(response.status).toEqual(200);
  });

  it('delete users /deleteUsers', async () => {
    const response = await request(app).delete('/deleteUsers').expect(200);
    expect(response.status).toEqual(200);
  });
});
