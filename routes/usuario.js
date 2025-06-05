/*
se encuentra en el index.js >>>>> path: /api/usuarios
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuario } = require('../controllers/usuario');


const router = Router();

router.get('/', validarJWT, getUsuario);

module.exports = router;