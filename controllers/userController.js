// Importar el modelo de usuario
const { UserModel } = require('./userModel');

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
    const { nombre, apellido, correo, password, privilegio } = req.body;
    try {
        // Verificar si el correo electrónico ya está registrado

        UserModel.findUserByEmail(correo, (err, existingUser) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error en el servidor' });
            }
            if (existingUser) {
                return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
            }else{

                // Crear un nuevo usuario
                const user = new UserModel(nombre, apellido, correo, password, privilegio);

                // Guardar el usuario en la base de datos
                user.save();

                // Generar un token de autenticación
                const token = user.generateAuthToken();

                // Enviar la respuesta con el token
                res.json({ token });  
            }
        });


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
