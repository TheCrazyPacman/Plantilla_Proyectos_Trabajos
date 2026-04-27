const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getConnection } = require('./config/db');

// Inicialización
const app = express();
const PORT = process.env.PORT || 4000;

// Conectar Base de Datos al arrancar
getConnection();

// Middlewares
app.use(cors());
app.use(express.json()); // Lectura de JSON

// Rutas base
app.use('/api/auth', require('./routes/auth.routes'));

// Ruta de prueba para saber si el backend vive
app.get('/api/health', (req, res) => {
    res.json({ status: 'Servidor funcionando', date: new Date() });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});