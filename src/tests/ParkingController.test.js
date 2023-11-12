import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/parking.routes';

describe('Parking Controller', () => {

  const app = express();
  app.use(bodyParser.json());
  app.use(router);

  it('should get all parking data', async () => {
    const response = await request(app).get('/parking/');
    expect(response.status).toBe(200);
  });

  it('should calculate extra fee', async () => {
    const response = await request(app).get('/calculateExtraFee');
    console.log(response.body);
    expect(response.status).toBe(200);

  });

  it('should calculate final payment', async () => {
    const response = await request(app).post('/calculateFinalPayment').send({
      user_id: 1,  // Reemplaza con el ID de usuario correcto
    });
    expect(response.status).toBe(200);

  });

  it('should register payment', async () => {
    const response = await request(app).post('/registerPayment').send({
      user_id: 1,  // Reemplaza con el ID de usuario correcto
    });
    expect(response.status).toBe(200);
  });

  /*it('should get parking history', async () => {
    const response = await request(app).get('/parking/history/1');  // Reemplaza con el ID de usuario correcto
    expect(response.status).toBe(200);
  });*/
});
