const  validaCampos  = require('../middlewares/validarCampos');
const  validaRoles = require('../middlewares/validar-roles');
const  validaJWT  = require('../middlewares/validar-jwt');
const validarArchivoSubir = require('../middlewares/validar-archivo');

module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJWT,
    ...validarArchivoSubir
}