// Rutas del servidor para manejar el registro, el envío de correos y el login.
const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./db');
const transporter = require('./mailer');

const router = express.Router();
const saltRounds = 10;

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/interfaz.html'));
});

router.post('/enviar-datos', async (req, res) => {
    const { user_email, user_password } = req.body;
    const nombre_default = "Nuevo Usuario"; 

    try { 
        const passwordHash = await bcrypt.hash(user_password, saltRounds);

        const sql = "INSERT INTO usuarios (nombre_usuario, correo, password) VALUES (?, ?, ?)";
        db.query(sql, [nombre_default, user_email, passwordHash], (err, result) => {        
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ mensaje: "Este correo ya está registrado. Usa otro." });
                }
                console.error(err);
                return res.status(500).json({ mensaje: "Error al guardar en la base de datos." });
            }

            const mailOptions = {
                from: process.env.MAIL_USER,
                to: user_email,
                subject: '¡Login PW ',
                text: `Hola! Prueba de programa funcional, Mejorado Martinez Juan Esteban: ${user_email}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error de correo: " + error);
                    res.status(200).json({ mensaje: "Te registraste en la BD, pero hubo un error enviando el correo." });
                } else {
                    res.status(200).json({ mensaje: "¡Registro exitoso! Revisa tu correo electrónico." });
                }
            });
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al procesar la seguridad." });
    }
});

router.post('/login', async (req, res) => {
    const { user_email, user_password } = req.body; 

    const sql = "SELECT * FROM usuarios WHERE correo = ?";

    db.query(sql, [user_email], async (err, result) => {
        if (err) return res.status(500).json({ mensaje: "Error en el servidor." });
        
        if (result.length > 0) {
            const usuario = result[0];
            const coinciden = await bcrypt.compare(user_password, usuario.password);
            
            if (coinciden) { 
                res.status(200).json({ mensaje: `Bienvenido ${usuario.nombre_usuario}, inicio de sesión exitoso.` });
            } else {
                res.status(401).json({ mensaje: "Usuario o contraseña incorrectos." });
            }
        } else {
            res.status(401).json({ mensaje: "Usuario o contraseña incorrectos." });
        }
    });
});

module.exports = router;