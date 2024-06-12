// routes/stadioni.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Stadion = require('../models/stadion');

// Dohvati sve stadione
router.get('/', async (req, res) => {
    try {
        const stadioni = await Stadion.find().populate('lokacija');
        res.json(stadioni);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati jedan stadion po ID-u
router.get('/:id', async (req, res) => {
    try {
        const stadion = await Stadion.findById(req.params.id).populate('lokacija');
        if (!stadion) {
            return res.status(404).json({ message: 'Stadion nije pronađen' });
        }
        res.json(stadion);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novi stadion
router.post('/', async (req, res) => {
    const stadion = new Stadion(req.body);
    try {
        const noviStadion = await stadion.save();
        res.status(201).json(noviStadion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj postojeći stadion
router.put('/:id', async (req, res) => {
    try {
        const stadion = await Stadion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!stadion) {
            return res.status(404).json({ message: 'Stadion nije pronađen' });
        }
        res.json(stadion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obriši stadion
router.delete('/:id', async (req, res) => {
    try {
        const stadion = await Stadion.findByIdAndDelete(req.params.id);
        if (!stadion) {
            return res.status(404).json({ message: 'Stadion nije pronađen' });
        }
        res.json({ message: 'Stadion je obrisan' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
