const app = require('./app');
const http = require('http');
const connectToDatabase = require('./database/index').connectToDatabase;

const UserService = require('./services/users');

const port = '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    console.log(`Listening on ${port}`);
});


UserService.getAll();