const request = require('supertest');
const app = require('../routes/user.routes'); // Asegúrate de ajustar la ruta según tu estructura de archivos

describe('User Controller', () => {
  let token; // Almacenará el token de autenticación para las pruebas

  // Antes de las pruebas, registra un usuario y obtén el token
  beforeAll(async () => {
    console.log('Before all: Start');
    try {
      const response = await request(app)
        .post('/user/register')
        .send({
          name: 'TestUser',
          lastname: 'TestLastName',
          email: 'test@example.com',
          password: 'testpassword',
          priority: 1,
        });

      token = response.body.token;
      console.log('Before all: END');
    } catch (error) {
      throw error; // Si hay un error, lánzalo para que Jest lo maneje
    }
  }, 15000); // Aumentamos el timeout a 15 segundos

  // Después de las pruebas, puedes limpiar o cerrar cualquier recurso que hayas utilizado
  afterAll(async () => {
    // Puedes agregar limpieza de la base de datos u otros recursos aquí
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: 'NewUser',
        lastname: 'NewLastName',
        email: 'newuser@example.com',
        password: 'newpassword',
        priority: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Usuario creado exitosamente');
    expect(response.body.token).toBeDefined();
  });

  it('should fail to register a user with invalid parameters', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        name: '',
        lastname: '',
        email: 'invalidemail',
        password: 'short',
        priority: 'notanumber',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(5); // Ajusta este número según la cantidad de errores esperados
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Inicio de sesión exitoso');
    expect(response.body.token).toBeDefined();
  });

  it('should fail to log in with incorrect credentials', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'test@example.com',
        password: 'incorrectpassword',
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
  });

  // Puedes agregar más pruebas según sea necesario
});
