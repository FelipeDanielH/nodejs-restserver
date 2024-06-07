const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const { limite = 2, desde = 0 } = req.query;

    const query = { estado: true }

    /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    const total = await Usuario.countDocuments(query); */

    const [ total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    const datos = usuarios.map( usuario => {
        let {nombre, _id:uid} =  usuario
        return {nombre, uid}
    })

    res.json({
        total,
        datos
    })
}

const usuarioGet = async (req = request, res = response) => {
    const {id} = req.params;

    const usuario = await Usuario.findOne( {_id:id});

    if(!usuario) return

    res.json({
        usuario
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

    if (password) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, body);

    res.status(200).json({
        msg: 'put succesfully - controlador',
        usuario
    });
}

const usuariosPatch = (req, res) => {
    res.status(200).json({
        msg: 'patch succesfully - controlador'
    });
}

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    const uid = req.uid;

    // obtener el usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    const usuarioAutenticado = req.usuario;

    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuarioGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}