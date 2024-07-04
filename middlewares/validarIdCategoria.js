const Categoria = require('../models/categoria');
const mongoose = require('mongoose');

const validarCategoria = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria con id: '${id}' no existe`);
    }
}

module.exports = {
    validarCategoria
}