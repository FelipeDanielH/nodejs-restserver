const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

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

    res.json({
        total,
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

    if (password) {
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, body);

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

const usuariosDelete = async (req, res) => {

    const { id } = req.params;

    // Forma mas agresiva de borrarlo
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})

    res.status(200).json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}