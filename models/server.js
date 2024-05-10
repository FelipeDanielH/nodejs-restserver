const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

require('dotenv').config();


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

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
        this.app.use( this.usuariosPath, require('../routes/user'));
        this.app.use( this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;