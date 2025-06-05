const express = require('express');
const path = require('path');
require('dotenv').config()

//Conexion de Base de datos
const {dbConnection} = require('./database/config')
dbConnection();

//App de Express
const app = express();

//Lectura y parseo del Body
app.use(express.json());

//App de Express
const port = process.env.PORT

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

//Path Publico
const publicPath = path.resolve( __dirname, 'public');
app.use(express.static(publicPath));

//Mis Rutas
app.use('/api/login', require('./routes/auth'));
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/mensajes', require('./routes/mensajes'));

server.listen(port, (err) => {
    if(err) throw new Error(err);

    console.log('Servido Corriendo en el Puerto', port);
});