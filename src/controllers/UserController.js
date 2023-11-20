// Importar el modelo de usuario
const db = require("../models");
const User = db.user;
var crypto = require("crypto");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateAccessToken(user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "1800s" });
}

// Controlador para el registro de usuarios
exports.register = async (req, res) => {
  const { name, lastname, email, password, priority } = req.body;
  const errors = [];
  try {
    //Validaciones
    if (name === "" || lastname === "") {
      //return res.status(400).json({ error: "Parámetros inválidos." });
      errors.push("Parámetros inválidos.");
    }
    if (password.length < 8) {
      //return res.status(400).json({ error: "Contraseña inválida. (min 8)" });
      errors.push("Contraseña inválida. (min 8).");
    }
    if (!emailRegex.test(email)) {
      //return res.status(400).json({ error: "Correo electrónico inválido." });
      errors.push("Correo electrónico inválido.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    //Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      //return res.status(400).json({ error: "Ya hay un usuario registrado con este correo." });
      errors.push("Correo ya registrado.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const passwordHash = crypto
      .createHmac("sha256", process.env.TOKEN_SECRET)
      .update(password)
      .digest("hex");

    //Crear usuario
    const user = await User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passwordHash,
      priority: 0,
    });

    const tokenPayload = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      // Agrega otros campos necesarios aquí
    };

    //Generar token
    const token = generateAccessToken(tokenPayload);
    res.status(201).json({ message: "Usuario creado exitosamente", token });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  try {
    //Verificar si el usuario ya existe
    const existingUser = await User.findOne({
      where: { email },
    });

    if (!existingUser) {
      //return res.status(400).json({ error: "No hay un usuario registrado con este correo." });
      errors.push("El usuario no existe.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    //Hash de la contraseña ingresada

    const passwordHash = crypto
      .createHmac("sha256", process.env.TOKEN_SECRET)
      .update(password)
      .digest("hex");

    const tokenPayload = {
      id: existingUser.id,
      name: existingUser.name,
      lastname: existingUser.lastname,
      email: existingUser.email,
    };
    //Verificar si la contraseña es correcta
    if (passwordHash === existingUser.password) {
      const token = generateAccessToken(tokenPayload);
      return res
        .status(200)
        .json({ message: "Inicio de sesión exitoso", token });
    } else {
      //return res.status(401).json({ error: 'Credenciales inválidas' });
      errors.push("Error al iniciar sesión.");
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "lastname", "email", "priority"],
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
}