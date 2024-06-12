const mongoose = require('mongoose');

const adresaSchema = new mongoose.Schema({
    selo: String,
    grad: String,
    zupanija: String,
    drzava: String
});

module.exports = mongoose.model('adresa', adresaSchema,'adrese');