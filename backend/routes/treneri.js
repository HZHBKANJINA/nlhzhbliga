const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Trener = require('../models/trener');

// Dohvati sve trenere
router.get('/', async (req, res) => {
    try {
        const treneri = await Trener.find();
        res.json(treneri);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati pojedinačnog trenera po ID-u
router.get('/:id', async (req, res) => {
    try {
        const trener = await Trener.findById(req.params.id);
        if (!trener) {
            return res.status(404).json({ message: 'Trener nije pronađen' });
        }
        res.json(trener);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novog trenera
router.post('/', async (req, res) => {
    const trener = new Trener(req.body);
    try {
        const noviTrener = await trener.save();
        res.status(201).json(noviTrener);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj trenera
router.put('/:id', async (req, res) => {
    try {
        const trener = await Trener.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!trener) {
            return res.status(404).json({ message: 'Trener nije pronađen' });
        }
        res.json(trener);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši trenera
router.delete('/:id', async (req, res) => {
    try {
        const trener = await Trener.findByIdAndDelete(req.params.id);
        if (!trener) {
            return res.status(404).json({ message: 'Trener nije pronađen' });
        }
        res.json({ message: 'Trener je izbrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
