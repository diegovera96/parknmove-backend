import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import router from '../routes/parking.routes';

describe('Reservation Controller', () => {
  it('should create a new reservation', async () => {
    const mockReservationData = {
      user_id: 19,
      parking_id: 1,
      entry_time: '2023-01-01T12:00:00.000Z',
      exit_time: null,
      extra_fee: 10
    };

    const app = express();
    app.use(bodyParser.json());
    app.use(router);

    const response = await request(app)
      .post('/reservations')
      .send(mockReservationData);
    
    // Check the response status and structure
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user_id', mockReservationData.user_id);
    expect(response.body).toHaveProperty('parking_id', mockReservationData.parking_id);
    expect(response.body).toHaveProperty('entry_time', mockReservationData.entry_time);
    expect(response.body).toHaveProperty('exit_time', mockReservationData.exit_time);
    expect(response.body).toHaveProperty('extra_fee', mockReservationData.extra_fee);
  });
});
