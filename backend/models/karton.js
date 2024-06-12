// models/karton.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kartonSchema = new Schema({
  naziv: String,
  igrac: { type: mongoose.Schema.Types.ObjectId, ref: 'igrac' },
  utakmica: { type: mongoose.Schema.Types.ObjectId, ref: 'utakmica' }
});

module.exports = mongoose.model('karton', kartonSchema,'kartoni');
