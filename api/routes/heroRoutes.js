// api/routes/heroRoutes.js
const express = require('express');
const router = express.Router();
const HeroController = require('../controllers/heroController');

// GET /api/hero
router.get('/', HeroController.getHeroData);

module.exports = router;