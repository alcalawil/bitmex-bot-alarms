const http = require('http');
const dotenv = require('dotenv');
const app = require('./app');
dotenv.config();

const port = process.env.PORT || 3000; // TODO: Add to config
const server = http.createServer(app);

server.listen(port);

console.log(`Server listen at port: ${port}`);