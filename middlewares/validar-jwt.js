const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: '401 - Unauthorize: no hay token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET)

        req.uid = uid
        
        const usuario = await Usuario.findById( uid )
        req.usuario = usuario


        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'token no valido'
        })
    }
}

module.exports = {
    validarJWT
}