const { request, response } = require('express')

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

const usuraiosPost = (req, res) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post succesfully - controlador',
        nombre,
        edad
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
    usuraiosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}