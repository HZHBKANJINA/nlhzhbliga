const mongoose = require('mongoose');

const stadionSchema = new mongoose.Schema({
    naziv: String,
    lokacija: { type: mongoose.Schema.Types.ObjectId, ref: 'adresa' }
});

// Specificiranje imena postojeće kolekcije 'stadioni'
module.exports = mongoose.model('stadion', stadionSchema,'stadioni');
