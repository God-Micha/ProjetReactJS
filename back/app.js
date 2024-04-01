require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    origins: '*:*'
})

const port = process.env.PORT || 3000;
let onlineUsers = 0;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch((err) => {console.log('Error connecting to MongoDB', err)});

const gridRoutes = require('./routes/gridRoutes');
app.use('/api/chunks', gridRoutes);

io.on('connection', (socket) => {
    onlineUsers++
    io.emit('users', onlineUsers)
    socket.on('disconnect', function () {
        onlineUsers--
        io.emit('users', onlineUsers)
    })
})

io.on('connection', (socket) => {
    socket.emit('data', board)
    socket.on('color', color => {
        board.push(color)
        io.emit('color', color)
    })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});