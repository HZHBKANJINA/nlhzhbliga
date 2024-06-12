const mongoose = require('mongoose');

const delegatSchema = new mongoose.Schema({
    ime: String,
    prezime: String,
    datum_rodjenja: Date
});

// Specificiranje imena postojeće kolekcije 'delegati'
module.exports = mongoose.model('delegat', delegatSchema,'delegati');
