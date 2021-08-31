// BUILD YOUR SERVER HERE
const express = require('express');

const server = express();

server.use(express.json()) //Teaches express to read json

server.get('/', (req, res) => {
    res.status(200).json({ message: 'server working'})
})

server.use('*', (req, res) => {
    res.status(404).json({ message: 'sorry, no route found!'}) //Order matters!
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
