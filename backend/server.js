const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json());

// MongoDB
mongoose.connect('mongodb://localhost:27017/miapp');

mongoose.connection.once('open', () => {
  console.log('MongoDB conectado 🚀');
});

// Modelo
const User = require('./models/User');

// Ruta prueba
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend 🚀' });
});

// Registro
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hash });
  await user.save();

  res.json({ message: 'Usuario creado' });
});

// Servidor
app.listen(3000, '0.0.0.0', () => {
  console.log('Backend corriendo en puerto 3000');
});

//crear login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).send('Usuario no existe');

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) return res.status(400).send('Password incorrecto');

  const token = jwt.sign({ id: user._id }, 'secreto123');

  res.json({ token });
});

//crear ruta protegida
function auth(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send('No token');

  try {
    const decoded = require('jsonwebtoken').verify(token, 'secreto123');
    req.user = decoded;
    next();
  } catch {
    res.status(401).send('Token inválido');
  }
}

// ruta protegida
app.get('/api/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ email: user.email });
});


//react 

require('dotenv').config();

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

if (!token) {
  return <p>No autorizado</p>;
}


localStorage.removeItem('token');
window.location.reload();
