# Proyecto Login

Sistema de registro e inicio de sesión desarrollado con Node.js, Express, MySQL y Nodemailer. Permite a los usuarios registrarse, guardar sus contraseñas de forma segura (encriptadas con bcrypt) y recibir un correo electrónico de confirmación tras un registro exitoso.

## Tecnologías utilizadas

- Node.js
- Express
- MySQL (mysql2)
- Nodemailer (para el envío de correos)
- Bcrypt (para encriptación de contraseñas)
- HTML5, CSS3 y JavaScript (Frontend)

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
- Node.js
- MySQL (y MySQL Workbench)

## Instalación y configuración

1. Clona este repositorio en tu máquina local:
   git clone https://github.com/TuUsuario/proyecto-login.git
   cd proyecto-login

2. Instala las dependencias del proyecto:
   npm install

3. Configura la base de datos:
   - Abre MySQL Workbench.
   - Abre el archivo `database.sql` que está en la raíz de este proyecto.
   - Ejecuta el script para crear la base de datos y la tabla de usuarios.

4. Configura las variables de entorno:
   - En la raíz del proyecto, crea un archivo llamado `.env`.
   - Copia y pega el siguiente contenido, reemplazando los valores con los de tu propia configuración:

   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=tu_contraseña_de_mysql
   DB_NAME=sistema_login
   MAIL_USER=tu_correo@gmail.com
   MAIL_PASS=tu_contraseña_de_aplicacion

## Ejecución

Para iniciar el servidor en modo de desarrollo, ejecuta:

node server.js

El servidor estará corriendo en http://localhost:3000