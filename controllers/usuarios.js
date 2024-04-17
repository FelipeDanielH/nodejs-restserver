const { request, response } = require('express');
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const {
        q = '',
        nombre = '',
        apiKey = '',
        page = '',
        limit = ''
    } = req.query;

    res.status(200).json({
        msg: 'get Succesfully - controlador',
        q,
        nombre,
        apiKey
    });
}

const usuariosPost = async (req, res) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'El correo ya esta registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(200).json({
        usuario
    });
}

const usuariosPut = (req, res) => {

    const { id } = req.params;

    res.status(500).json({
        msg: 'put succesfully - controlador',
        id
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