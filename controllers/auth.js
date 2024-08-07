const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/googleVerify');


const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ correo })

        //  verificar si el email existe
        if (!usuario) {
            return res.status(400).json({
                msg: 'Bad Request - correo incorrecto'
            });
        }

        //  Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario desactivado'
            })
        }

        // Verificar que la contraseña sea correct
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'password no valido'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const googleSignIn = async (req, res = res = response) => {

    const { id_token } = req.body

    try {
        const { correo, nombre, img } = await googleVerify(id_token)

        let usuario = await Usuario.findOne({ correo })

        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: '123',
                img,
                rol: 'USER_ROLE',
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB esta desactivado (eliminado)
        if ( !usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario desactivado. Contacte a soporte'
            });
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'todo ok',
            usuario,
            id_token
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}

module.exports = {
    login,
    googleSignIn
}