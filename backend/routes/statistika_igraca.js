const express = require('express');
const router = express.Router();
const StatistikaIgrac = require('../models/statistika_igrac');

// Dohvati sve statistike igrača
router.get('/', async (req, res) => {
    try {
        const statistike = await StatistikaIgrac.find().populate('igrac').populate('utakmica');
        res.json(statistike);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati pojedinačnu statistiku igrača po ID-u
router.get('/:id', async (req, res) => {
    try {
        const statistika = await StatistikaIgrac.findById(req.params.id).populate('igrac').populate('utakmica');
        if (!statistika) {
            return res.status(404).json({ message: 'Statistika igrača nije pronađena' });
        }
        res.json(statistika);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novu statistiku igrača
router.post('/', async (req, res) => {
    const statistika = new StatistikaIgrac(req.body);
    try {
        const novaStatistika = await statistika.save();
        res.status(201).json(novaStatistika);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj statistiku igrača
router.put('/:id', async (req, res) => {
    try {
        const statistika = await StatistikaIgrac.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!statistika) {
            return res.status(404).json({ message: 'Statistika igrača nije pronađena' });
        }
        res.json(statistika);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši statistiku igrača
router.delete('/:id', async (req, res) => {
    try {
        const statistika = await StatistikaIgrac.findByIdAndDelete(req.params.id);
        if (!statistika) {
            return res.status(404).json({ message: 'Statistika igrača nije pronađena' });
        }
        res.json({ message: 'Statistika igrača je izbrisana' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
