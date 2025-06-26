const express = require('express');
const router = express.Router();
const { calculateBenefits } = require('../controllers/illustrationController');
const auth = require('../middlewares/auth');

// POST /api/illustrations - Calculate benefits
router.post('/', auth, calculateBenefits);

module.exports = router;