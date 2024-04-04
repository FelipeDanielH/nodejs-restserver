const express = require('express');
require('dotenv').config();


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    middlewares() {
        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.send('hola mundo');
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;