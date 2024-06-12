const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Utakmica = require('../models/utakmica');

// Dohvati sve utakmice
router.get('/', async (req, res) => {
    try {
        const utakmice = await Utakmica.find()
            .populate('lokacija')
            .populate('stadion')
            .populate('domacin')
            .populate('gost')
            .populate('glavni_sudac')
            .populate('pomocni_sudac1')
            .populate('pomocni_sudac2')
            .populate('cetvrti_sudac')
            .populate('var_sudac')
            .populate('avar_sudac')
            .populate('delegat')
        res.json(utakmice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati jednu utakmicu po ID-u
router.get('/:id', async (req, res) => {
    try {
        const utakmica = await Utakmica.findById(req.params.id)
            .populate('lokacija')
            .populate('stadion')
            .populate('domacin')
            .populate('gost')
            .populate('glavni_sudac')
            .populate('pomocni_sudac1')
            .populate('pomocni_sudac2')
            .populate('cetvrti_sudac')
            .populate('var_sudac')
            .populate('avar_sudac')
            .populate('delegat')
        if (!utakmica) {
            return res.status(404).json({ message: 'Utakmica nije pronađena' });
        }
        res.json(utakmica);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novu utakmicu
router.post('/', async (req, res) => {
    const utakmica = new Utakmica(req.body);
    try {
        const novaUtakmica = await utakmica.save();
        res.status(201).json(novaUtakmica);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj utakmicu
router.put('/:id', async (req, res) => {
    try {
        const utakmica = await Utakmica.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('lokacija')
            .populate('stadion')
            .populate('domacin')
            .populate('gost')
            .populate('glavni_sudac')
            .populate('pomocni_sudac1')
            .populate('pomocni_sudac2')
            .populate('cetvrti_sudac')
            .populate('var_sudac')
            .populate('avar_sudac')
            .populate('delegat')
        if (!utakmica) {
            return res.status(404).json({ message: 'Utakmica nije pronađena' });
        }
        res.json(utakmica);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši utakmicu
router.delete('/:id', async (req, res) => {
    try {
        const utakmica = await Utakmica.findByIdAndDelete(req.params.id);
        if (!utakmica) {
            return res.status(404).json({ message: 'Utakmica nije pronađena' });
        }
        res.json({ message: 'Utakmica je izbrisana' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
