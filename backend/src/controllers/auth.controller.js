const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
// const { getConnection, mssql } = require('../config/db'); // Descomenta cuando uses la BD

const login = async (req, res = response) => {
    const { usuario, password, tokenSecurity } = req.body;

    try {
        // 1. Aquí buscarías al usuario en MS SQL Server
        // const pool = await getConnection();
        // const result = await pool.request().input('email', mssql.VarChar, email).query('SELECT * FROM Usuarios WHERE email = @email');
        
        // Simulación de usuario para la plantilla
        const user = { id: 1, usuario: 'admin123', password: '123' }; 

        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.COPIA_CLASE_SECRETA}&response=${tokenSecurity}`
        );

        if (!response.data.success) {
            return res.status(400).json({
                ok: false,
                msg: 'Captcha no válido'
            });
        }

        if ( usuario !== user.usuario || password !== user.password ) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario o contraseña incorrectos'
            });
        }
        
        // 2. Validar contraseña con bcrypt
        // const validPassword = bcrypt.compareSync(password, user.password);

        // 3. Generar el JWT
        const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        res.json({
            ok: true,
            uid: user.id,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'Error al iniciar sesión' });
    }
};

const renewToken = async (req, res = response) => {
    const { uid } = req; // Obtenido del middleware validateJWT

    // Generar un nuevo JWT para extender la sesión
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
        expiresIn: '2h'
    });

    res.json({
        ok: true,
        uid,
        token
    });
};

module.exports = {
    login,
    renewToken
};