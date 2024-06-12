const express = require('express');
const router = express.Router();
const Delegat = require('../models/delegat');

// Dohvati sve delegata
router.get('/', async (req, res) => {
    try {
        const delegati = await Delegat.find();
        res.json(delegati);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati delegata po ID-u
router.get('/:id', async (req, res) => {
    try {
        const delegat = await Delegat.findById(req.params.id);
        if (!delegat) {
            return res.status(404).json({ message: 'Delegat nije pronađen' });
        }
        res.json(delegat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Ažuriraj delegata
router.put('/:id', async (req, res) => {
    try {
        const delegat = await Delegat.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!delegat) {
            return res.status(404).json({ message: 'Delegat nije pronađen' });
        }
        res.json(delegat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši delegata
router.delete('/:id', async (req, res) => {
    try {
        const delegat = await Delegat.findByIdAndDelete(req.params.id);
        if (!delegat) {
            return res.status(404).json({ message: 'Delegat nije pronađen' });
        }
        res.json({ message: 'Delegat je izbrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
