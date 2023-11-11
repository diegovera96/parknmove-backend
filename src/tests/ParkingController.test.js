const request = require('supertest');
const app = require('../routes/parking.routes');

describe('Parking Controller', () => {
  it('should get all parking data', async () => {
    const response = await request(app).get('/parking/');
    expect(response.status).toBe(200);
    // Agrega más expectativas según lo necesario
  });

  it('should calculate extra fee', async () => {
    const response = await request(app).get('/parking/calculateExtraFee');
    expect(response.status).toBe(200);
    // Agrega más expectativas según lo necesario
  });

  it('should calculate final payment', async () => {
    const response = await request(app).post('/parking/calculateFinalPayment').send({
      user_id: 1,  // Reemplaza con el ID de usuario correcto
    });
    expect(response.status).toBe(200);
    // Agrega más expectativas según lo necesario
  });


});
