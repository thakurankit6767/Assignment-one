const calculateIllustration = (inputs) => {
  const {
    policyType,
    sumAssured,
    premiumPaymentTerm,
    policyTerm,
    premiumPaymentFrequency,
    premiumAmount,
    age
  } = inputs;

  // Initialize illustration object
  const illustration = {
    policyType,
    sumAssured,
    premiumPaymentTerm,
    policyTerm,
    premiumPaymentFrequency,
    premiumAmount,
    age,
    yearlyProjections: []
  };

  // Calculate yearly projections based on policy type and parameters
  for (let year = 1; year <= policyTerm; year++) {
    let deathBenefit = 0;
    let maturityBenefit = 0;
    let surrenderValue = 0;
    let totalPremiumPaid = premiumAmount * (premiumPaymentFrequency === 'Yearly' ? 1 : 12) * Math.min(year, premiumPaymentTerm);

    // Simplified calculation logic (replace with actual business rules)
    if (policyType === 'Term') {
      deathBenefit = year <= policyTerm ? sumAssured : 0;
      maturityBenefit = year === policyTerm ? sumAssured * 0.1 : 0;
      surrenderValue = year >= 3 ? totalPremiumPaid * 0.3 : 0;
    } else if (policyType === 'Endowment') {
      deathBenefit = year <= policyTerm ? sumAssured : 0;
      maturityBenefit = year === policyTerm ? sumAssured : 0;
      surrenderValue = year >= 3 ? totalPremiumPaid * 0.7 : 0;
    } else if (policyType === 'Whole Life') {
      deathBenefit = sumAssured + (sumAssured * 0.03 * year);
      surrenderValue = year >= 5 ? totalPremiumPaid * 0.8 : 0;
    }

    illustration.yearlyProjections.push({
      year,
      age: age + year,
      premiumPaid: year <= premiumPaymentTerm ? premiumAmount * (premiumPaymentFrequency === 'Yearly' ? 1 : 12) : 0,
      totalPremiumPaid,
      deathBenefit,
      maturityBenefit,
      surrenderValue
    });
  }

  return illustration;
};

module.exports = { calculateIllustration };