const express = require('express');

const projectRouter = require('./routes/projectRoutes');
const actionRouter = require('./routes/actionRoutes');

const server = express();

server.use(express.json());
server.use('/api/actions', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send('<h1>Web API Sprint Challenge</h1>');
});

module.exports = server;