const { calculateIllustration } = require('../services/calculationService');
const { validateIllustrationInputs } = require('../services/validationService');

const calculateBenefits = async (req, res) => {
  const errors = validateIllustrationInputs(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const illustration = calculateIllustration(req.body);
    res.json(illustration);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { calculateBenefits };