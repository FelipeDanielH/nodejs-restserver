const { request, response } = require('express');
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

    const body = req.body;
    const usuario = new  Usuario( body );

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