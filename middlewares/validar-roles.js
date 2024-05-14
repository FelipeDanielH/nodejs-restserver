const { response } = require("express")

const esAdminRole = ( req, res = response, next ) => {

    // Verifica que el 
    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Rol no valido - token not found'
        })
    }

    const { rol, nombre } = req.usuario;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Usuario "${ nombre }" no autorizado`
        })
    }

    next();
}

module.exports = {
    esAdminRole    
}