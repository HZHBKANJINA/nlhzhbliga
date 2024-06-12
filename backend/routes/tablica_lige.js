const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const TablicaLige = require('../models/tablica_liga');

// Dohvati sve zapise u tablici lige
router.get('/', async (req, res) => {
    try {
        const tablica = await TablicaLige.find().populate('klub');
        res.json(tablica);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati pojedinačni zapis u tablici lige po ID-u
router.get('/:id', async (req, res) => {
    try {
        const zapis = await TablicaLige.findById(req.params.id).populate('klub');
        if (!zapis) {
            return res.status(404).json({ message: 'Zapis u tablici lige nije pronađen' });
        }
        res.json(zapis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novi zapis u tablici lige
router.post('/', async (req, res) => {
    const zapis = new TablicaLige(req.body);
    try {
        const noviZapis = await zapis.save();
        res.status(201).json(noviZapis);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj zapis u tablici lige
router.put('/:id', async (req, res) => {
    try {
        const zapis = await TablicaLige.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!zapis) {
            return res.status(404).json({ message: 'Zapis u tablici lige nije pronađen' });
        }
        res.json(zapis);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši zapis iz tablice lige
router.delete('/:id', async (req, res) => {
    try {
        const zapis = await TablicaLige.findByIdAndDelete(req.params.id);
        if (!zapis) {
            return res.status(404).json({ message: 'Zapis u tablici lige nije pronađen' });
        }
        res.json({ message: 'Zapis u tablici lige je izbrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
