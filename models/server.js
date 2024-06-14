const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

const { swaggerDocs } = require("../api/swaggerConfig");

require('dotenv').config();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {
            auth: '/api/auth',
            usuario: '/api/usuarios',
            categorias: '/api/categorias'
        }

        // Conexion a la base de datos
        this.conectarDB();


        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.use( this.paths.usuario, require('../routes/user'));
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
            swaggerDocs(this.app, this.port)
        });
    }
}

module.exports = Server;