const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete } = require('../controllers/usuarios');
const { check } = require('express-validator');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.patch('/', usuariosPatch);

router.post('/', [
    check('correo', 'El correo no es valido').isEmail(),
], usuariosPost);

router.delete('/', usuariosDelete);

module.exports = router;