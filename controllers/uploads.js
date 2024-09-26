const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require("express");
const { subirArchivo } = require("../helpers");
const { Usuario, Producto } = require("../models");

const cargarArchivo = async (req, res = response) => {

    try {
        // para cargar textos
        // const nombre = await subirArchivo( req.files, ['txt','md'], 'textos' );

        // para cargar imagenes (por defecto en el curso)... al enviar undefined en el argumento de las extensiones permitidas, la funcion utilizara el valor default
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({ msg });
    }
}

const actualizarImagen = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;

        case 'etc':
            modelo = await Producto.findById(id);
        default:
            return res.status(500).json({ mdg: 'Categoria aun no validada' });
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        console.log(pathImagen);
        try {
            if (fs.existsSync) {
                fs.unlinkSync(pathImagen);
            }
        } catch (error) {
            console.warn("Error ENOENT, probablemente la imagen dentro del objeto en bd no coincide o no existe")
        }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;

    await modelo.save();

    res.json(modelo);
}

const mostrarImagen = async (req, res = response) => {

    console.log(req.params);

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe usuario con el id ${id}`
                });
            };
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            };
            break;
        default:
            return res.status(500).json({ msg: 'Categoria no validada' })
    }

    // Limpiar imagenes previas
    if (modelo.img) {
        const pathImagen = path.join(__dirname, '../uploads', coleccion)

        if (fs.existsSync(pathImagen)) {
            return res.sendFile(pathImagen);
        }
    }

    const placeholder = path.join(__dirname, '../assets', 'no-image.jpg');
    res.sendFile(placeholder);
}


const actualizarImagenCloudinary = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                })
            }
            break;
        case 'etc':
            modelo = await Producto.findById(id);
        default:
            return res.status(500).json({ mdg: 'Categoria aun no validada' });
    }

    // Limpiar imagenes previas
    if (modelo.img) { // Ejemplo de un modelo.img: "https://res.cloudinary.com/dl70lindm/image/upload/v1724956197/eiyxfs6ty0qhrewsfsjw.png"
        const nombreArr = modelo.img.split('/'); // se divide todo el url (como el anterior) y quedara algo asi: ['https:','','res.cloudinary.com','dl70lindm','image','upload','v1724955856','bcvmwr7i5bg27cle4qtm.png']
        const nombre = nombreArr[ nombreArr.length -1 ]; // se toma el ultimo elemento ya que ese es el que nos sirve (nombre en cloudinary). El elemento es: 'bcvmwr7i5bg27cle4qtm.png' 
        const [ public_id ] = nombre.split('.'); // el .png del ultimo elemento no nos sirve asi que desestructuramos el primero elemento 'bcvmwr7i5bg27cle4qtm' y el .png lo dejamos fuera 
        cloudinary.uploader.destroy( public_id ); // con el metodo destroy de la api de cloudinary eliminamos la imagen con el nombre repetido
    }

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen,
    actualizarImagenCloudinary
}