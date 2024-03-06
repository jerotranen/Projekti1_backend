const imageRouter = require('express').Router();
const Image = require('../image');

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

module.exports = imageRouter;