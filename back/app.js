const express = require('express');
const app = express();
const port = 8080;
const mongo = require('./mongo');

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	next();
});

app.listen(port, () => {
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