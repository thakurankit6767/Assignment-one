const express = require('express');
const router = express.Router();
const { getAllPolicies, getPolicyById } = require('../controllers/policyController');
const auth = require('../middlewares/auth');

router.get('/', auth, getAllPolicies);
router.get('/:id', auth, getPolicyById);

module.exports = router; // Must export the router