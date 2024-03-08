const imageRouter = require('express').Router();
const Image = require('../models/image');

// Router ilmoittautumisen kuvalle

imageRouter.post('/', async (req, res) => {
  const { imageURL } = req.body;

  try {
    let existingImage = await Image.findOne();
    if (existingImage) {
      existingImage.imageURL = imageURL;
    } else {
      existingImage = new Image({ imageURL });
    }

    await existingImage.save();

    res.status(201).json({ message: 'Image URL submitted successfully' });
  } catch (error) {
    console.error('Error submitting image URL:', error);
    res.status(500).json({ error: 'An error occurred while submitting image URL' });
  }
});

imageRouter.get('/', async (req, res) => {
  const imageURL = await Image.findOne();
  res.json(imageURL);
});

module.exports = imageRouter;