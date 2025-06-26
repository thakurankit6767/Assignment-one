const validateIllustrationInputs = (inputs) => {
  const errors = [];
  const {
    policyType,
    sumAssured,
    premiumPaymentTerm,
    policyTerm,
    premiumPaymentFrequency,
    premiumAmount,
    age
  } = inputs;

  // Validation 1: Policy term must be >= premium payment term
  if (policyTerm < premiumPaymentTerm) {
    errors.push({
      msg: 'Policy term must be greater than or equal to premium payment term',
      param: 'policyTerm'
    });
  }

  // Validation 2: Age + policy term must be <= 70
  if (age + policyTerm > 70) {
    errors.push({
      msg: 'Age plus policy term must not exceed 70 years',
      param: 'policyTerm'
    });
  }

  // Validation 3: Sum assured must be at least 10 times annual premium
  const annualPremium = premiumPaymentFrequency === 'Yearly' 
    ? premiumAmount 
    : premiumAmount * 12;
  if (sumAssured < annualPremium * 10) {
    errors.push({
      msg: 'Sum assured must be at least 10 times the annual premium',
      param: 'sumAssured'
    });
  }

  // Validation 4: Premium payment term must be 5, 10, 15, or 20 years
  if (![5, 10, 15, 20].includes(premiumPaymentTerm)) {
    errors.push({
      msg: 'Premium payment term must be 5, 10, 15, or 20 years',
      param: 'premiumPaymentTerm'
    });
  }

  // Validation 5: Age must be between 18 and 60
  if (age < 18 || age > 60) {
    errors.push({
      msg: 'Age must be between 18 and 60 years',
      param: 'age'
    });
  }

  return errors;
};

module.exports = { validateIllustrationInputs };