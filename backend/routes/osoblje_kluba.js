// routes/osoblje_kluba.js
const express = require('express');
const router = express.Router();
const OsobljeKlub = require('../models/osoblje_klub');

// Dohvati sve osoblje kluba
router.get('/', async (req, res) => {
    try {
        const osobljeKlub = await OsobljeKlub.find().populate('klub');
        res.json(osobljeKlub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati pojedinačno osoblje kluba po ID-u
router.get('/:id', async (req, res) => {
    try {
        const osobljeKlub = await OsobljeKlub.findById(req.params.id).populate('klub');
        if (!osobljeKlub) {
            return res.status(404).json({ message: 'Osoblje kluba nije pronađeno' });
        }
        res.json(osobljeKlub);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novo osoblje kluba
router.post('/', async (req, res) => {
    const osobljeKlub = new OsobljeKlub(req.body);
    try {
        const noviOsobljeKlub = await osobljeKlub.save();
        res.status(201).json(noviOsobljeKlub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj postojećeg osoblje kluba
router.put('/:id', async (req, res) => {
    try {
        const osobljeKlub = await OsobljeKlub.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!osobljeKlub) {
            return res.status(404).json({ message: 'Osoblje kluba nije pronađeno' });
        }
        res.json(osobljeKlub);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši osoblje kluba
router.delete('/:id', async (req, res) => {
    try {
        const osobljeKlub = await OsobljeKlub.findByIdAndDelete(req.params.id);
        if (!osobljeKlub) {
            return res.status(404).json({ message: 'Osoblje kluba nije pronađeno' });
        }
        res.json({ message: 'Osoblje kluba je izbrisano' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
