const mongoose = require('mongoose');

const User = require('./User');

mongoose.connect('mongodb://localhost/goddessElo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connexion error:'));
db.once('open', function () { console.log('Connected to the DB'); });

// Récupération de tous les utilisateurs 
exports.getUsers = async () => {
    try {
        const users = await User.find({});
        return users;
        //console.log(users);
    } catch (err) {
        console.error(err);
        return [];
    }
}