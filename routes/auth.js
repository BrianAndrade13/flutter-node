/*
se encuentra en el index.js >>>>> path: /api/login
*/

const { Router } = require('express');
const { crearUsuarios, loginUsuarios, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new', [
    check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
    check('correo', 'El Correo es Obligatorio').isEmail(),
    check('contraseña', 'La Contraseña es Obligatorio').not().isEmpty(),
    validarCampos
], crearUsuarios);

router.post('/', [
    check('contraseña', 'La Contraseña es Obligatorio').not().isEmpty(),
    check('correo', 'El Correo es Obligatorio').isEmail(),
    validarCampos
], loginUsuarios)

router.get('/renew', validarJWT, renewToken);

module.exports = router;