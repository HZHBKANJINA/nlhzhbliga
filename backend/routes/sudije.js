const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Sudija = require('../models/sudija');

// Dohvati sve sudije
router.get('/', async (req, res) => {
    try {
        const sudije = await Sudija.find();
        res.json(sudije);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati pojedinačnu sudiju po ID-u
router.get('/:id', async (req, res) => {
    try {
        const sudija = await Sudija.findById(req.params.id);
        if (!sudija) {
            return res.status(404).json({ message: 'Sudija nije pronađena' });
        }
        res.json(sudija);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novu sudiju
router.post('/', async (req, res) => {
    const sudija = new Sudija(req.body);
    try {
        const novaSudija = await sudija.save();
        res.status(201).json(novaSudija);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj sudiju
router.put('/:id', async (req, res) => {
    try {
        const sudija = await Sudija.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sudija) {
            return res.status(404).json({ message: 'Sudija nije pronađena' });
        }
        res.json(sudija);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši sudiju
router.delete('/:id', async (req, res) => {
    try {
        const sudija = await Sudija.findByIdAndDelete(req.params.id);
        if (!sudija) {
            return res.status(404).json({ message: 'Sudija nije pronađena' });
        }
        res.json({ message: 'Sudija je izbrisana' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
