const { response } = require("express");
const { Categoria } = require('../models')


// obtener categoria - populate - total - populate
const obtenerCategorias = async (req, res = response) => {

    const { limite = 2, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, categorias] = await Promise.all([
            Categoria.countDocuments( query ),
            Categoria
                .find(query)
                .populate( "usuario", "nombre" ) // populate busca un usuario que coincida con el id suministrado y rellena con los datos (como un join)
                .skip( Number( desde ) )
                .limit( Number( limite ) )
        ]);
        res.status(200).json({total,categorias});
    } catch (error) {
        res.status(400).json({msg: "error en las categorias"});
    }
}

// obtener categoria
const obtenerCategoria = async (req, res = response) => {
    try {
        const { id }= req.params;
        const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
        res.status(200).json(categoria);
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}


// crear categoria
const crearCategoria = async (req, res = response) => {

    // Obtener la categoria del request body
    const nombre = req.body.nombre.toUpperCase();

    // Buscar la categoria en la base de datos para verificar que no este duplicada
    const categoriaDB = await Categoria.findOne({ nombre });

    // Si la categoria existe entonces devuelve error
    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        })
    }

    // Crear objeto a partir del nombre de la categoria y agregarle el id
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    // El objeto final contendra el id del creador (usuario)
    const categoria = new Categoria(data);

    // Se guarda en la bd
    await categoria.save();

    res.status(201).json(categoria);
}

// actualizar categoria
const actualizarCategoria = async (req, res = response) => {
    try {
        const {id} = req.params;
        const { estado, usuario, ...data } = req.body;

        data.nombre = data.nombre.toUpperCase();
        data.usuario = req.usuario._id;

        const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json(categoria);
        // res.status(200).json(usuarioModificado);
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
}


// borrar categoria (no borrar explicitamente, solo cambiar el estado a false)

const eliminarCategoria = async (req, res = response) => {
    try {
        const {id} = req.params;

        const categoriaEliminada = await Categoria.findByIdAndUpdate(id, {estado:false});

        res.status(200).json(categoriaEliminada);

    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}