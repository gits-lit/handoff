const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});

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

const SERVER_PORT = (process.env.PORT || 3000);
server.listen(SERVER_PORT, () => console.log(`Server started on port ${SERVER_PORT}.`));