const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  premium: {
    type: Number,
    required: true
  },
  coverage: {
    type: Number,
    required: true
  }
});

const PolicySchema = new mongoose.Schema({
  policyType: {
    type: String,
    required: true,
    enum: ['Term', 'Whole Life', 'Endowment', 'ULIP', 'Annuity']
  },
  policyName: {
    type: String,
    required: true
  },
  basePremium: {
    type: Number,
    required: true
  },
  sumAssured: {
    type: Number,
    required: true
  },
  term: {
    type: Number,
    required: true
  },
  riders: [RiderSchema],
  benefits: {
    deathBenefit: Number,
    maturityBenefit: Number,
    surrenderValue: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Policy', PolicySchema);