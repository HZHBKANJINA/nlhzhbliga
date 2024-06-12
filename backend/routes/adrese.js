const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Adresa = require('../models/adresa');

// Dohvati sve adrese
router.get('/', async (req, res) => {
    try {
        const adrese = await Adresa.find();
        res.json(adrese);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dohvati jednu adresu po ID-u
router.get('/:id', async (req, res) => {
    try {
        const adresa = await Adresa.findById(req.params.id);
        if (!adresa) {
            return res.status(404).json({ message: 'Adresa nije pronađena' });
        }
        res.json(adresa);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Dodaj novu adresu
router.post('/', async (req, res) => {
    try {
        const novaAdresa = await Adresa.create(req.body);
        res.status(201).json(novaAdresa);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Ažuriraj adresu
router.put('/:id', async (req, res) => {
    try {
        const azuriranaAdresa = await Adresa.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!azuriranaAdresa) {
            return res.status(404).json({ message: 'Adresa nije pronađena' });
        }
        res.json(azuriranaAdresa);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Izbriši adresu
router.delete('/:id', async (req, res) => {
    try {
        const obrisanaAdresa = await Adresa.findByIdAndDelete(req.params.id);
        if (!obrisanaAdresa) {
            return res.status(404).json({ message: 'Adresa nije pronađena' });
        }
        res.json({ message: 'Adresa je izbrisana' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
