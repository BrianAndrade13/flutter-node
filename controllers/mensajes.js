const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res) => {
  try {
    const miId = req.uid;
    const mensajesDe = req.params.de;

    if (miId === mensajesDe) {
      return res.status(400).json({
        ok: false,
        msg: 'No puedes iniciar un chat contigo mismo'
      });
    }

    const last30 = await Mensaje.find({
      $or: [
        { de: miId, para: mensajesDe },
        { de: mensajesDe, para: miId }
      ]
    }).sort({ createdAt: 'desc' }).limit(30);

    res.json({
      ok: true,
      mensajes: last30
    });
  } catch (error) {
    console.error('Error en obtenerChat:', error);
    res.status(500).json({ ok: false, msg: 'Error al obtener mensajes' });
  }
};


module.exports = {
    obtenerChat
}