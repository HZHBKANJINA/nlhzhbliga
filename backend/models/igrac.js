const mongoose = require('mongoose');

const igracSchema = new mongoose.Schema({
    slika: String,
    ime: String,
    prezime: String,
    nadimak: String,
    datum_rodjenja: Date,
    broj: Number,
    rating: Number,
    pozicija: String,
    noga: String,
    klub: { type: mongoose.Schema.Types.ObjectId, ref: 'klub' }
});

module.exports = mongoose.model('igrac', igracSchema,'igraci');
