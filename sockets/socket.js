
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');

//Mensajes de Sockets
io.on('connection', (client) => {
    console.log('Cliente Conectado');
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //Verificar autenticacion
    if(!valido){return client.disconnect();}
    console.log('cliente autenticado');

    //Cliente autenticado
    usuarioConectado(uid);

    //Ingresar al usuario en una sala en particular
    //sala global, client.id, 683a25c170f236c152858d33
    client.join(uid);

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async(payload) => {
        

        //TODO: Grabar mensajes\/
        const ok = await grabarMensaje(payload);

        if (ok) {
            io.to(payload.para).emit('mensaje-personal', payload);
        } else {
            console.warn('No se pudo grabar el mensaje:', payload);
        }
        io.to(payload.para).emit('mensaje-personal', payload);
    }); 

    client.on('disconnect', () => {
    console.log('Cliente Desconectado');
    usuarioDesconectado(uid);
    });

    // client.on('mensaje', (payload) => {
    //     console.log('Nombre Esperado:', payload);

    // io.emit('mensaje', {admin: 'Es un Nuevo Emit'});
    // });
});
