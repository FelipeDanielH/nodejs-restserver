 const { response } = require('express')
const jwt = require('jsonwebtoken')
 
 const validarJWT = (req, res = response, next ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: '401 - Unauthorize: no hay token'
        })
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET)

        console.log(payload)

        next();
    }catch(error){
        console.log(error)
        res.status(401).json({
            msg: 'token no valido'
        })
    }
 }

 module.exports = {
    validarJWT 
 }