// Importar el modelo de usuario
const db = require("../src/models");
const User = db.user;
var crypto = require('crypto'); 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
    const { name, lastname, email, password, priority } = req.body;
    try {
        //Validaciones
        if(name === "" || lastname === ""){
            return res.status(400).json({ error: "Parámetros inválidos." });
        }
        if (password.length < 8) {
            return res.status(400).json({ error: "Contraseña inválida. (min 8)" });
        }
        if(!emailRegex.test(email)){
            return res.status(400).json({ error: "Correo electrónico inválido." });
        }

        //Verificar si el usuario ya existe
        const existingUser = await User.findOne({
            where: { email },
        });
    
        if (existingUser) {
            return res.status(400).json({ error: "Ya hay un usuario registrado con este correo." });
        }

        //Hash de la contraseña
        const salt = crypto.randomBytes(16).toString('hex');
        const secretKey = 'mysecretkey';
    
        const passwordHash = crypto.createHmac('sha256', secretKey)
        .update(password)
        .digest('hex');
        
        //Crear usuario
        const user = await User.create({
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: passwordHash,
            priority: req.body.priority
        });

        //Generar token
        const token = user.generateAuthToken();

        res.status(201).json({ message: 'Usuario creado exitosamente', user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {

        //Verificar si el usuario ya existe
        const existingUser = await User.findOne({
            where: { email },
        });
    
        if (!existingUser) {
            return res.status(400).json({ error: "No hay un usuario registrado con este correo." });
        }

        //Hash de la contraseña ingresada
        const salt = crypto.randomBytes(16).toString('hex');
        const secretKey = 'mysecretkey';
    
        const passwordHash = crypto.createHmac('sha256', secretKey)
        .update(password)
        .digest('hex');

        //Verificar si la contraseña es correcta
        if (passwordHash === existingUser.password) {
        const token = existingUser.generateAuthToken();
        return res.status(200).json({ message: 'Inicio de sesión exitoso', existingUser, token });
        }

        return res.status(401).json({ error: 'Credenciales inválidas' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
