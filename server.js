// Archivo principal de arranque del servidor. Configura Express y conecta las rutas.
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});