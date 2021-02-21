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

const SERVER_PORT = (process.env.PORT || 3000);
const server = app.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}.`));

const io = require('socket.io')(server, {
    cors: {
        origin: '*' // enable CORS for sockets
    }
});

let cachedData = '';
let listOfClients = {};
let number = 0;
io.on('connection', client => {
    let id = client.id;

    client.on('mousemove', data => {
        data.id = id;
        data.number = listOfClients[id]
        client.broadcast.emit('mousemove', data);
    });

    client.on('edit', data => {
        if (id in listOfClients) {
            if (data != cachedData) {
                client.broadcast.emit('edit-back', data);
                cachedData = data;
            }
        } else {
            number++;
            console.log(listOfClients);
            if ( Object.keys(listOfClients).length == 0 ) {
                cachedData = '';
            }
            else {
                client.emit('edit-back', cachedData);
            }
            listOfClients[id] = number;
        }
    });

    client.on('lock', data => {
        client.broadcast.emit('lock', data);
    });

    client.on('disconnect', () => {
        delete listOfClients[id];
        client.broadcast.emit('disconnected', id)
    });
    client.broadcast.emit('connected', id);

    console.log(`Client [${id}] has connected.`);
});