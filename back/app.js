require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
const port = 8080;
const mongo = require('./mongo');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {console.log('Connected to MongoDB')})
    .catch((err) => {console.log('Error connecting to MongoDB', err)});

const gridRoutes = require('./routes/gridRoutes');
const authRoutes = require('./routes/authRoute');
app.use('/api/chunks', gridRoutes);
app.use('/api/auth', authRoutes);

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(`server listening at http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Goddees Elo is saying you Hello!');
});

app.get('/users', (req, res) => {
	mongo.getUsers()
		.then(data => {
			//console.log(JSON.stringify(data))
			res.send(JSON.stringify(data));
		});
});

app.get('/pixelboards', (req, res) => {
	mongo.getPixelboards()
		.then(data => {
			res.send(JSON.stringify(data));
		});
});