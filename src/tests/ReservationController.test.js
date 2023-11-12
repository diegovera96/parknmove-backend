import request from 'supertest';
import app from '../your-app-entry-file'; // Update this with the actual path to your app entry file

describe('Reservation Controller', () => {
  it('should create a new reservation', async () => {
    // Prepare a mock reservation data for testing
    const mockReservationData = {
      user_id: 1,
      parking_id: 1,
      total_price: 0,
      entry_time: '2023-01-01T12:00:00Z',
      exit_time: '2023-01-01T14:00:00Z',
      extra_fee: 10,
    };

    // Send a POST request to the /reservations route with the mock data
    const response = await request(app)
      .post('/reservations')
      .send(mockReservationData);

    // Check the response status and structure
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('user_id', mockReservationData.user_id);
    expect(response.body).toHaveProperty('parking_id', mockReservationData.parking_id);
    expect(response.body).toHaveProperty('total_price', mockReservationData.total_price);
    expect(response.body).toHaveProperty('entry_time', mockReservationData.entry_time);
    expect(response.body).toHaveProperty('exit_time', mockReservationData.exit_time);
    expect(response.body).toHaveProperty('extra_fee', mockReservationData.extra_fee);
  });

  // Add more tests as needed for other scenarios (e.g., validation, error handling, etc.)
});
