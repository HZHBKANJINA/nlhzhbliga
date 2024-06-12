// routes/igraci.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Igrac = require('../models/igrac')

// Dohvati sve igrače
router.get('/', async (req, res) => {
    try {
        const igraci = await Igrac.find().populate('klub');
        res.json(igraci);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati jednog igrača po ID-u
router.get('/:id', async (req, res) => {
    try {
        const igrac = await Igrac.findById(req.params.id).populate('klub');
        if (!igrac) {
            return res.status(404).json({ message: 'Igrač nije pronađen' });
        }
        res.json(igrac);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novog igrača
router.post('/', async (req, res) => {
    const igrac = new Igrac(req.body);
    try {
        const noviIgrac = await igrac.save();
        res.status(201).json(noviIgrac);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj postojećeg igrača
router.put('/:id', async (req, res) => {
    try {
        const igrac = await Igrac.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!igrac) {
            return res.status(404).json({ message: 'Igrač nije pronađen' });
        }
        res.json(igrac);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obriši igrača
router.delete('/:id', async (req, res) => {
    try {
        const igrac = await Igrac.findByIdAndDelete(req.params.id);
        if (!igrac) {
            return res.status(404).json({ message: 'Igrač nije pronađen' });
        }
        res.json({ message: 'Igrač je obrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
