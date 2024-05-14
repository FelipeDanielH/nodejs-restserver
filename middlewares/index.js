const  validaCampos  = require('../middlewares/validarCampos');
const  validaRoles = require('../middlewares/validar-roles');
const  validaJWT  = require('../middlewares/validar-jwt');

module.exports = {
    ...validaCampos,
    ...validaRoles,
    ...validaJWT
}