const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias');
const { validarCategoria } = require('../middlewares/validarIdCategoria');
const { existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

/*
http://localhost:8080/(api/categorias)
*/

// Obtener todas las categorias - publico (no necesita validaciones)
router.get('/', obtenerCategorias )

// Obtener categoria por id
router.get('/:id', [
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom( validarCategoria ),
    validarCampos
], obtenerCategoria )

// Crear categoria - privado - cualquier rol (con un token valido)
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria )

// Actualizar categorias - privado - necesita token
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( validarCategoria ),
    validarCampos,
], actualizarCategoria )

// Borrar una categoria
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( validarCategoria ),
    validarCampos
], eliminarCategoria )

module.exports = router;