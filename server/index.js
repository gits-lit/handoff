const http = require('http');
const cors = require('cors');

const server = http.createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

const SERVER_PORT = (process.env.PORT || 3000);

io.on('connection', client => {
    let id = client.id;

    client.on('mousemove', data => {
        data.id = id;
        client.broadcast.emit('mousemove', data);
    });

    client.on('edit', data => client.broadcast.emit('edit', data));
    client.on('disconnect', () => client.broadcast.emit('disconnect', id));
    client.broadcast.emit('connect', id);

    console.log(`Client [${id}] has connected.`);
});

server.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}.`));