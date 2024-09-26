const dbValidators = require('./db-validators');
const generarJWT = require('./db-validators');
const googleVerify = require('./googleVerify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
}
