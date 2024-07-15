
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Bookstore API',
      version: '1.0.0',
      description: 'API documentation for the Online Bookstore application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
