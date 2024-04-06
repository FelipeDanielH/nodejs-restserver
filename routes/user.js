const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPatch, usuraiosPost, usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.patch('/', usuariosPatch);

router.post('/', usuraiosPost);

router.delete('/', usuariosDelete);

module.exports = router;