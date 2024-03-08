const formRouter = require('express').Router();
const Form = require('../models/form');

// Router ilmoittautumisten hallinnoimiselle

formRouter.post('/', async (req, res) => {
  try {
    const { name, sposti, createdAt } = req.body;

    const existingForm = await Form.findOne({ sposti });
    if (existingForm) {
      return res.status(400).json({ error: 'Sähköpostilla on jo ilmoittauduttu' });
    }

    const newIlmo = new Form({ name, sposti, createdAt });
    await newIlmo.save();

    res.status(201).json({ message: 'Apply form submitted successfully' });
  } catch (error) {
    console.error('Error submitting apply form:', error);
    res.status(500).json({ error: 'An error occurred while submitting apply form' });
  }
});

formRouter.get('/', async (req, res) => {
  const ilmot = await Form.find({});
  res.json(ilmot);
});

formRouter.delete('/', async (req, res) => {
  await Form.deleteMany({});
  res.status(204).send();
});

formRouter.get('/:sposti', async (req, res) => {
  const sposti = req.params.sposti;
  const form = await Form.findOne({sposti});
  res.json(form);
});

formRouter.delete('/:sposti', async (req, res) => {
  const sposti = req.params.sposti;
  const form = await Form.findOneAndDelete({sposti});
  res.status(204).end()
});

module.exports = formRouter;