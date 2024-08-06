const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { existeProductoPorId } = require('../helpers/db-validators');
const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/producto');
const producto = require('../models/producto');
const { validarCategoria } = require('../middlewares/validarIdCategoria');

const router = Router();

router.get('/',[], obtenerProductos );

router.get('/:id', [
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], obtenerProducto );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom( validarCategoria ),
    validarCampos
], crearProducto );


router.put('/:id', [
    validarJWT,
    check('id').custom( existeProductoPorId ),
    validarCampos
], actualizarProducto )

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos,
], borrarProducto )

module.exports = router