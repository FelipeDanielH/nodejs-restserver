const { response } = require('express');
const { Usuario, Categoria, Producto } = require('../models');
const { ObjectId } = require('mongoose').Types;

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuarios = async( termino = '', res = response ) => {
    // se observa si el termino recibido es un id de mongo
    const esMongoId = ObjectId.isValid( termino ); 

    // si resulta ser un id de mongo se devuelve el elemento unico que coincide con el id buscado
    if( esMongoId ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [ usuario ] : []
        })
    }

    // si no es un id de mongo entonces se evalua como una expresion regular. La 'i' significa que no importa si es mayuscula o minuscula
    const regex = new RegExp( termino, 'i')

    // se procede a hacer la busqueda con mongoose
    const usuarios = await Usuario.find({ 
        $or: [{nombre: regex}, {correo: regex}], // $or evalua dos coincidencias usando la expresion logica 'or'
        $and: [{ estado: true }] // $and, al ser la segunda opcion, se agrega a la lista de expresiones a evaluar. en este caso solo se evalua que todo tenga el estado en true, o sea, no hay una segunda condicion para que se aplique la logica de 'and'
    });

    return res.json({
        results: usuarios
    })
}

const buscarCategoria = async ( termino = '', res = response ) => {
    
    const esMongoId = ObjectId.isValid( termino );

    if( esMongoId ) {
        const categoria = await Categoria.findbyId(termino);
        return res.json({
            result: (categoria) ? [ categoria ] : []
        })
    }

    const categorias = await Categoria.find({nombre: {$regex: 'galleta', $options: 'i'}})

    return res.json({
        results: categorias
    })
}

const buscarProductos = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId) {
        const producto = await Producto.findById(termino);
        return res.json({
            result: (producto) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino );

    const productos = await Producto.find([{nombre: regex}, {estado: true}]
    )

    return res.json({
        results: productos
    })
}

const buscar = (req, res = response ) => {

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `La coleccion no esta dentro de las colecciones permitidas ${ coleccionesPermitidas }`
        });
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;
        case 'categorias':
            buscarCategoria(termino, res)
            break;
        case 'productos':
            buscarProductos(termino, res)
            break;
        default:
            res.status(500).json({ msg: 'categoria no implementada '})
    }
}

module.exports = {
    buscar,
    buscarUsuarios,
    buscarCategoria,
    buscarProductos
}