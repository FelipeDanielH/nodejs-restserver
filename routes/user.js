const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');
const { esRolValido } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.patch('/', usuariosPatch);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 6 letras').isLength({min: 6}),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( (rol) => esRolValido(rol) ),
    validarCampos
], usuariosPost);

router.delete('/', usuariosDelete); 

module.exports = router;