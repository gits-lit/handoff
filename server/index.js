const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// to avoid a CORS issue
app.use((req, res, next) => {
    // http://localhost:5000
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// just some default page
app.get('/', (req, res) => res.send("Handoff's server :)"));

// set up API route
app.use('/api', require('./routes/main'));

const SERVER_PORT = (process.env.SERVER_PORT || 5000);
app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}.`));

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: '*' // enable CORS for sockets
    }
});

let cachedData = '';
let listOfClients = {};
io.on('connection', client => {
    let id = client.id;
    if (cachedData) {
        client.emit('edit-back', cachedData);
    }

    client.on('mousemove', data => {
        data.id = id;
        client.broadcast.emit('mousemove', data);
    });

    client.on('edit', data => {
        if (id in listOfClients) {
            client.broadcast.emit('edit-back', data);
            cachedData = data;
        } else {
            listOfClients[id] = '';
        }
    });
    client.on('disconnected', () => {
        delete listOfClients[id];
        client.broadcast.emit('disconnected', id)
    });
    client.broadcast.emit('connected', id);

    console.log(`Client [${id}] has connected.`);
});

const SOCKET_PORT = (process.env.SOCKET_PORT || 3000);
server.listen(SOCKET_PORT, () => console.log(`Sockets started on port ${SOCKET_PORT}.`));