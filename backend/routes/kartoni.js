// routes/kartoni.js
const express = require('express');
const router = express.Router();
const Karton = require('../models/karton');

// Kreiranje novog kartona
router.post('/', async (req, res) => {
  try {
    const karton = new Karton(req.body);
    await karton.save();
    res.status(201).json(karton);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dohvaćanje svih kartona
router.get('/', async (req, res) => {
  try {
    const kartoni = await Karton.find().populate('igrac').populate('utakmica');
    res.status(200).json(kartoni);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Dohvaćanje pojedinog kartona po ID-u
router.get('/:id', async (req, res) => {
  try {
    const karton = await Karton.findById(req.params.id).populate('igrac').populate('utakmica');
    if (!karton) {
      return res.status(404).json({ error: 'Karton not found' });
    }
    res.status(200).json(karton);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ažuriranje kartona po ID-u
router.put('/:id', async (req, res) => {
  try {
    const karton = await Karton.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('igrac').populate('utakmica');
    if (!karton) {
      return res.status(404).json({ error: 'Karton not found' });
    }
    res.status(200).json(karton);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Brisanje kartona po ID-u
router.delete('/:id', async (req, res) => {
  try {
    const karton = await Karton.findByIdAndDelete(req.params.id);
    if (!karton) {
      return res.status(404).json({ error: 'Karton not found' });
    }
    res.status(200).json({ message: 'Karton deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
