
const {io} = require('../index');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');

    client.on('disconnect', () => {
    console.log('Cliente Desconectado');
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Nombre Esperado:', payload);

    // io.emit('mensaje', {admin: 'Es un Nuevo Emit'});
    // });
});
