require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
import {processBatch, batch} from './batch';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch((err) => {console.log('Error connecting to MongoDB', err)});

const gridRoutes = require('./routes/grid');
app.use('/api/grid', gridRoutes);
setInterval(processBatch, 5000);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});