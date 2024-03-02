const formRouter = require('express').Router();
const Form = require('../form');

formRouter.post('/', async (req, res) => {
  try {
    const { name, sposti, createdAt } = req.body;

    const newIlmo = new Form({ name, sposti, createdAt });
    await newIlmo.save();

    res.status(201).json({ message: 'Apply form submitted successfully' });
  } catch (error) {
    console.error('Error submitting apply form:', error);
    res.status(500).json({ error: 'An error occurred while submitting apply form' });
  }
});

module.exports = formRouter;