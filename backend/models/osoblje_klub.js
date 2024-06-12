const mongoose = require('mongoose');

const osobljeKlubaSchema = new mongoose.Schema({
    ime: String,
    prezime: String,
    datum_rodjenja: Date,
    klub: { type: mongoose.Schema.Types.ObjectId, ref: 'klub' }
});

module.exports = mongoose.model('osoblje_klub', osobljeKlubaSchema,'osoblje_kluba');
