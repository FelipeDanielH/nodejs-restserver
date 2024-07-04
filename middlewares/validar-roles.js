const { response } = require("express")

const esAdminRole = (req, res = response, next) => {

    // Verifica que el usuario tenga el rol 'ADMIN_ROLE' en la bd
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Rol no valido - token not found'
        })
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Usuario "${nombre}" no autorizado`
        })
    }

    next();
}

const tieneRole = (...roles) => {
    return (req, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'token not found'
            })
        }

        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles "${ roles }"`
            })
        }

        console.log(roles, req.usuario.rol)

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}