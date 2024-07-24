const Producto = require('../models/producto');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El mail ${ correo } ya esta registrado en la BD`);
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario  = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El id ${id} no existe`);
    }
}

const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if( !existeProducto ) {
        throw new Error(`El id no existe ${id}`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoPorId
}