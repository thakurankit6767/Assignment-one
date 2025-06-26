const Policy = require('../models/Policy');

const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.json(policies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getPolicyById = async (req, res) => {
  try {
    const policy = await Policy.findById(req.params.id);
    if (!policy) {
      return res.status(404).json({ msg: 'Policy not found' });
    }
    res.json(policy);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Policy not found' });
    }
    res.status(500).send('Server error');
  }
};

module.exports = { getAllPolicies, getPolicyById };