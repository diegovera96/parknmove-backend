const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'express',
    password: 'express',
    database: 'express_db'
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

class UserModel {
    constructor(nombre, apellido, correo, password, privilegio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.password = password;
        this.privilegio = privilegio;
    }

    save() {
        const sql = 'INSERT INTO users (name, lastname, email, password, priority) VALUES (?, ?, ?, ?, ?)';
        const values = [this.nombre, this.apellido, this.correo, this.password, this.privilegio];
        
        connection.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log('User saved successfully!');
        });
    }
    
    generateAuthToken(){
        const payload = {
            correo: this.correo
        };

        var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

        return token;
    }

    static findUserByCredentials(correo, password, callback) {
        const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
        connection.query(sql, [correo, password], (err, results) => {
          if (err) {
            return callback(err, null);
          }
          if (results.length === 0) {
            return callback(null, null);
          }
          const user = new UserModel(results[0].nombre, results[0].apellido, results[0].correo, results[0].password, results[0].privilegio);
          return callback(null, user);
        });
      }

    static findUserByEmail(correo, callback) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        connection.query(sql, [correo], (err, results) => {
          if (err) {
            return callback(err, null);
          }
          if (results.length === 0) {
            return callback(null, null);
          }
          const user = results[0];
          return callback(null, user);
        });
    }
}
module.exports = { UserModel };