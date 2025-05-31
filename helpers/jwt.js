const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {
        
    const payload = {uid};

    jwt.sign(payload, process.env.JWT_KEY, {
        expiresIn: '24h'
    }, (err, token) => {
        if (err) {
            //! No se pudo crear Token
            reject('No se pudo crear el JTW!!!!');
        } else {
            //todo:TOKEN!!!!!!!!
            resolve(token);
        }
      });
    });
}

module.exports = {
    generarJWT
}