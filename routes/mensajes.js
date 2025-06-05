/*
se encuentra en el index.js >>>>> path: /api/mensajes
*/
const {obtenerChat} = require('../controllers/mensajes')
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:de', validarJWT, obtenerChat);

module.exports = router;