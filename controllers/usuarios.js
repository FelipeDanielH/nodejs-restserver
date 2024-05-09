const { request, response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

   /*  const {
        q = '',
        nombre = '',
        apiKey = '',
        page = '',
        limit = ''
    } = req.query; */

    const { limite = 2, desde = 0 } = req.query;

    const usuarios = await Usuario.find()
    .skip( Number(desde) )
    .limit(Number(limite))

    res.json({
        usuarios
    })
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(200).json({
        usuario
    });
}

const usuariosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...body } = req.body;

    if( password ){
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, body );

    res.status(500).json({
        msg: 'put succesfully - controlador',
        usuario
    });
}

const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: 'patch succesfully - controlador'
    });
}

const usuariosDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete succesfully - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}