// server.js

// Uvoz potrebnih modula
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB konekcija
mongoose.connect('mongodb://localhost:27017/nlhzhb', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB konekcija uspostavljena');
});

// Uvoz modela
require('./models/igrac');
require('./models/stadion');
require('./models/adresa');
require('./models/klub');
require('./models/karton');
require('./models/delegat');
require('./models/osoblje_klub');
require('./models/statistika_igrac');
require('./models/statistika_klub');
require('./models/sudija');
require('./models/tablica_liga');
require('./models/trener');
require('./models/utakmica');

// Uvoz ruta
const igraciRouter = require('./routes/igraci');
const stadioniRouter = require('./routes/stadioni');
const adreseRouter = require('./routes/adrese');
const kluboviRouter = require('./routes/klubovi');
const kartoniRouter=require('./routes/kartoni');
const delegatiRouter=require('./routes/delegati');
const osobljeKlubaRouter=require('./routes/osoblje_kluba');
const statistikaIgracaRouter=require('./routes/statistika_igraca');
const statistikaKlubaRouter=require('./routes/statistika_kluba');
const sudijeRouter=require('./routes/sudije');
const tablicaLigeRouter=require('./routes/tablica_lige');
const treneriRouter=require('./routes/treneri');
const utakmiceRouter=require('./routes/utakmice');

// Definisanje ruta
app.use('/igraci', igraciRouter);
app.use('/stadioni', stadioniRouter);
app.use('/adrese', adreseRouter);
app.use('/klubovi', kluboviRouter);
app.use('/kartoni',kartoniRouter);
app.use('/delegati',delegatiRouter);
app.use('/osobljekluba',osobljeKlubaRouter);
app.use('/statistikaigraca',statistikaIgracaRouter);
app.use('/statistikakluba',statistikaKlubaRouter);
app.use('/sudije',sudijeRouter);
app.use('/tablicalige',tablicaLigeRouter);
app.use('/treneri',treneriRouter);
app.use('/utakmice',utakmiceRouter);

// Pokretanje servera
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT}`);
});
