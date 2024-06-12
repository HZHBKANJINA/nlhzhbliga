const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Klub = require('../models/klub');

// Dohvati sve klubove
router.get('/', async (req, res) => {
    try {
        const klubovi = await Klub.find().populate('adresa').populate('stadion');
        res.json(klubovi);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati jedan klub po ID-u
router.get('/:id', async (req, res) => {
    try {
        const klub = await Klub.findById(req.params.id).populate('adresa').populate('stadion');
        if (!klub) {
            return res.status(404).json({ message: 'Klub nije pronađen' });
        }
        res.json(klub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novi klub
router.post('/', async (req, res) => {
    const klub = new Klub(req.body);
    try {
        const noviKlub = await klub.save();
        res.status(201).json(noviKlub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj klub
router.put('/:id', async (req, res) => {
    try {
        const klub = await Klub.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!klub) {
            return res.status(404).json({ message: 'Klub nije pronađen' });
        }
        res.json(klub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši klub
router.delete('/:id', async (req, res) => {
    try {
        const klub = await Klub.findByIdAndDelete(req.params.id);
        if (!klub) {
            return res.status(404).json({ message: 'Klub nije pronađen' });
        }
        res.json({ message: 'Klub je izbrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
