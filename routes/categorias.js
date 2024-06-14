const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares');

const router = Router();

/* 
 http://localhost:8080/(api/categorias)
*/

const val = validarCampos

// Obtener todas las categorias
router.get('/', ( req, res ) => {
    res.status(200).json('get ok')
})

// Obtener categoria por id
router.get('/:id', ( req, res ) => {
    res.json('get por id ok');
})

// Crear categoria - privado - cualquier rol
router.post('/', ( req,res ) => {
    res.json('post ok');
})

// Actualizar categorias
router.put('/', ( req, res ) => {
    res.json('put ok')
})

// Borrar una categoria
router.delete('/:id', (req, res) => {
    res.status(200).json('delete ok')
})


module.exports = router;