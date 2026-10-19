// Conexión y configuración de la base de datos MySQL usando variables de entorno.
const mysql = require('mysql2');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Error conectando a MySQL: " + err.message);
        return;
    }
    console.log("Conectado a MySQL Workbench");
    connection.release();
});

module.exports = db;