const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const StatistikaKluba = require('../models/statistika_klub');

// Dohvati sve statistike kluba
router.get('/', async (req, res) => {
    try {
        const statistike = await StatistikaKluba.find().populate('klub').populate('utakmica');
        res.json(statistike);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati pojedinačnu statistiku kluba po ID-u
router.get('/:id', async (req, res) => {
    try {
        const statistika = await StatistikaKluba.findById(req.params.id).populate('klub').populate('utakmica');
        if (!statistika) {
            return res.status(404).json({ message: 'Statistika kluba nije pronađena' });
        }
        res.json(statistika);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novu statistiku kluba
router.post('/', async (req, res) => {
    const statistika = new StatistikaKluba(req.body);
    try {
        const novaStatistika = await statistika.save();
        res.status(201).json(novaStatistika);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj statistiku kluba
router.put('/:id', async (req, res) => {
    try {
        const statistika = await StatistikaKluba.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!statistika) {
            return res.status(404).json({ message: 'Statistika kluba nije pronađena' });
        }
        res.json(statistika);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši statistiku kluba
router.delete('/:id', async (req, res) => {
    try {
        const statistika = await StatistikaKluba.findByIdAndDelete(req.params.id);
        if (!statistika) {
            return res.status(404).json({ message: 'Statistika kluba nije pronađena' });
        }
        res.json({ message: 'Statistika kluba je izbrisana' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
