// models/Klub.js
const mongoose = require('mongoose');

const klubSchema = new mongoose.Schema({
    naziv: String,
    adresa: { type: mongoose.Schema.Types.ObjectId, ref: 'adresa' },
    stadion: { type: mongoose.Schema.Types.ObjectId, ref: 'stadion' }
});

// Specificiranje imena postojeće kolekcije 'klubovi'
module.exports = mongoose.model('klub', klubSchema, 'klubovi');
