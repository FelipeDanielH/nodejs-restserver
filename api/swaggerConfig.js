const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api/swagger.yaml');

// Funcion para setear los docs
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-type', 'application/json');
        res.send(swaggerDocument)
    });

    console.log("version 1 doc")
};

module.exports = {
    swaggerDocs
}