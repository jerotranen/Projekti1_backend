const express = require('express');
const router = express.Router();
const IlmoStatus = require('../models/isopen');

// Tarkastaa ilmoittautumisen tilan
// Voidaan avata tai sulkea admin-oikeuksilla

router.get('/', async (req, res) => {
    const status = await IlmoStatus.findOne({});
    res.json(status);
  });

router.post('/', async (req, res) => {
  const { isOpen } = req.body;
  try {
    let status = await IlmoStatus.findOne({});
    if (!status) {
      status = new IlmoStatus({ isOpen });
    } else {
      status.isOpen = isOpen;
    }
    await status.save();
    res.json(status);
  } catch (error) {
    console.error('Error updating registration status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;