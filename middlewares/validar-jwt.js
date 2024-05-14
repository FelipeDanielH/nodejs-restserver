const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { cookie } = require('express-validator');

const validarJWT = async (req, res = response, next) => {
    // Obtiene el token de los headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: '401 - Unauthorize: no hay token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en la bd'
            })
        }

        // lee el usuario segun el uid obtenido del header
        const usuario = await Usuario.findById(uid)

        // verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'token no valido - usuario desactivado'
            })
        }

        req.uid = uid
        req.usuario = usuario

        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no valido - error al validar'
        })
    }
}

module.exports = {
    validarJWT
}