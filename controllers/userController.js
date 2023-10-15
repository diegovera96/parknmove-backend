// Importar el modelo de usuario
const db = require("../src/models");
const User = db.user;
const { UserModel } = require('./userModel');

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
    const { name, lastname, email, password, priority } = req.body;
    try {
        const existingUser = await User.findOne({
            where: { email },
          });
      
          if (existingUser) {
            return res.status(400).json({ error: "Ya hay un usuario registrado con este correo." });
          }

        const user = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            priority: req.body.priority
        });

        const token = user.generateAuthToken();

        res.status(201).json({ message: 'Usuario creado exitosamente', user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    const { correo, password } = req.body;
    try {
        UserModel.findUserByCredentials(correo, password, (err, existingUser) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error en el servidor' });
            }
            if (existingUser) {
                const token = existingUser.generateAuthToken();
                res.json({ token });
            } else {
                return res.status(400).json({ message: 'Credenciales incorrectas' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
