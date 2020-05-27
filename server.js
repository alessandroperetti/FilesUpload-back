const express = require('express');
const upload = require('./upload');
const list = require('./list');
const cors = require('cors');

const server = express()

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}

server.use(cors(corsOptions))

server.post('/upload', upload);
server.get('/list', list);

server.listen(8888, () => {
  console.log('Server started!')
})