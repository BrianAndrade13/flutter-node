const mongoose = require("mongoose");
const Usuario = require("../models/usuario");
const Mensaje = require("../models/mensaje");

const usuarioConectado = async(uid = '') => {
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        console.warn(`usuarioConectado: UID inválido -> "${uid}"`);
        return null;
    }

    const usuario = await Usuario.findById(uid);
    if (!usuario) return null;

    usuario.online = true;
    await usuario.save();
    return usuario;
};

const usuarioDesconectado = async(uid = '') => {
    if (!mongoose.Types.ObjectId.isValid(uid)) {
        console.warn(`usuarioDesconectado: UID inválido -> "${uid}"`);
        return null;
    }

    const usuario = await Usuario.findById(uid);
    if (!usuario) return null;

    usuario.online = false;
    await usuario.save();
    return usuario;
};

const grabarMensaje = async(payload) => {

    /*
    payload: {
        de: '',
        para: '',
        texto: '',
    }
    */
   try {
    const mensaje = new Mensaje(payload);
    await mensaje.save();

    return true;
   } catch (error) {
    console.error('Error al grabar mensaje:', error);
    return false;
   }
}
 
module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
};
