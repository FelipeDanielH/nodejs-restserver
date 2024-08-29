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

/**
 * Validar colecciones permitidas en la ruta de actualizar archivo
 * -----------------------
 * colecion: la extension .txt o .png que se va a enviar
 * colecciones: el arrego de colecciones permitidas
 */
const coleccionesPermitidas = ( coleccion ='', colecciones = [] ) => {
    const incluida = colecciones.includes( coleccion );
    if( !incluida ) {
        throw new Error(`La coleccion '${coleccion}' no es permitida, colecciones permitidas: (${colecciones})`);
    }

    // se retorna true porque la aplicacion de esta funcion esta dentro de otra funcion
    return true;
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeProductoPorId,
    coleccionesPermitidas
}