const express = require('express');
const cors = require('cors');

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
        // CORS
        this.app.use( cors() );

        // Directorio publico
        this.app.use( express.static('public') );
    }

    routes() {
        this.app.get('/api', (req, res) => {
            res.status(200).json({
                msg: 'get Succesfully'
            });
        });

        this.app.put('/api', (req, res) => {
            res.status(500).json({
                msg: 'put succesfully'
            })
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'post succesfully'
            })
        });

        this.app.delete('/api', (req, res) => {
            res.status(200).json({
                msg: 'delete succesfully'
            })
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }
}

module.exports = Server;