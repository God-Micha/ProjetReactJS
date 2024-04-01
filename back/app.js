require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: "*", // Autoriser l'accès depuis n'importe quelle origine
    credentials: true,
    optionsSuccessStatus: 200,
    methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization, X-Requested-With"
};
app.use(bodyParser.json());
app.use(cors(corsOptions));

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods : "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 200,
    }
});

let onlineUsers = 0;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch((err) => {console.log('Error connecting to MongoDB', err)});

const gridRoutes = require('./routes/gridRoutes');
const authRoutes = require('./routes/authRoute');


app.use('/api/chunks', gridRoutes);
app.use('/api/auth', authRoutes);


io.on('connection', (socket) => {
    onlineUsers++
    console.log(`Online users: ${onlineUsers}`)
    io.emit('onlineUsers', onlineUsers)

    socket.on('disconnect', function () {
        onlineUsers--
        io.emit('onlineUsers', onlineUsers)
        console.log(`Online users: ${onlineUsers}`)
    })

    socket.on('update_chunk', (content) => {
        const { x, y } = content;
        console.log(`chunk ${x} ${y} has been updated`);
        // Emit to all clients except the sender
        socket.broadcast.emit('update_chunk', content);
    });
})


server.listen(port, () => {
    console.log(`SERVER Listening on port http://localhost:${port}`);
});
