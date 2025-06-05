const { response } = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuarios = async (req, res = response) => {

    const {correo, nombre, contraseña} = req.body;

    try {
    const existeCorreo = await Usuario.findOne({correo});
    if(existeCorreo) {
        return res.status(400).json({
            ok: false,
            msg: `Este Correo: ${correo} ya existe en la Base de datos`
        });
    }

    const usuario = new Usuario(req.body);

    //TODO: Encriptar contraseñas
    const salt = bcrypt.genSaltSync();
    usuario.contraseña = bcrypt.hashSync(contraseña, salt);

    await usuario.save();

    //TODO: Generar JWT
    const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
            // correo,
            // nombre,
        });  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        });
      }
    }

const loginUsuarios = async (req, res = response) => {

    const {correo, contraseña} = req.body;

    try {
        //!Validacion del Correo
        const usuarioDB = await Usuario.findOne({correo});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: `El Correo: ${correo} no se encuentra registrado`
            });
        }

        //!Validacion de la contraseña
        const validContraseña = bcrypt.compareSync(contraseña, usuarioDB.contraseña);
        if(!validContraseña) {
            return res.status(400).json({
                ok: false,
                msg: `La Contraseña es Incorrecta`
            });
        }  

        //!Generar JWT
        const token = await generarJWT(usuarioDB.id);
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    } catch (error) {
        console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Hable con el Administrador'
     });        
    }
}

const renewToken = async (req, res = response) => {
  try {
    const uid = req.uid;

    const token = await generarJWT(uid); // ✅ pasar el UID

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        ok: false,
        msg: 'Token inválido - usuario no existe'
      });
    }

    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al renovar token'
    });
  }
};

module.exports = {
    crearUsuarios,
    loginUsuarios,
    renewToken
}