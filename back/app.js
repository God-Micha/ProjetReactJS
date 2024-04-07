require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch((err) => {console.log('Error connecting to MongoDB', err)});

const gridRoutes = require('./routes/gridRoutes');
const authRoutes = require('./routes/authRoute');
const canvasRoutes= require('./routes/canvasRoute');
app.use('/api/chunks', gridRoutes, );
app.use('/api/auth', authRoutes);
app.use('/api/canvas', canvasRoutes);


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});