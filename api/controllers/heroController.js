// api/controllers/heroController.js
const Hero = require('../models/Hero');

exports.getHeroData = async (req, res) => {
  try {
    const heroData = await Hero.findOne();
    res.json(heroData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};