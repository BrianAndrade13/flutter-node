const { response } = require("express");
const jwt = require("jsonwebtoken");


const validarJWT = (req, res = response, next) => {

        //Leer Token
        const token = req.header('x-token');

        if(!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No Hay Token en la Peticion'
            });
        }
        try {
            const {uid} = jwt.verify(token, process.env.JWT_KEY);
            req.uid = uid;

            next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no Valido'
            });
        }
}


module.exports = {
    validarJWT
}