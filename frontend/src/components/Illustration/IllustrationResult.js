import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const IllustrationResult = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [illustration] = useState(state?.illustration);

  if (!illustration) {
    navigate(`/policies/${id}/illustration`);
    return null;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Benefit Illustration Result</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Policy Details</h5>
          <div className="row">
            <div className="col-md-4">
              <p><strong>Policy Type:</strong> {illustration.policyType}</p>
            </div>
            <div className="col-md-4">
              <p><strong>Sum Assured:</strong> ₹{illustration.sumAssured.toLocaleString()}</p>
            </div>
            <div className="col-md-4">
              <p><strong>Policy Term:</strong> {illustration.policyTerm} years</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p><strong>Premium Payment Term:</strong> {illustration.premiumPaymentTerm} years</p>
            </div>
            <div className="col-md-4">
              <p><strong>Premium Frequency:</strong> {illustration.premiumPaymentFrequency}</p>
            </div>
            <div className="col-md-4">
              <p><strong>Premium Amount:</strong> ₹{illustration.premiumAmount.toLocaleString()}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <p><strong>Age:</strong> {illustration.age} years</p>
            </div>
          </div>
        </div>
      </div>

      <h4 className="mb-3">Yearly Projections</h4>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Year</th>
              <th>Age</th>
              <th>Premium Paid</th>
              <th>Total Premium Paid</th>
              <th>Death Benefit</th>
              <th>Maturity Benefit</th>
              <th>Surrender Value</th>
            </tr>
          </thead>
          <tbody>
            {illustration.yearlyProjections.map((projection) => (
              <tr key={projection.year}>
                <td>{projection.year}</td>
                <td>{projection.age}</td>
                <td>₹{projection.premiumPaid.toLocaleString()}</td>
                <td>₹{projection.totalPremiumPaid.toLocaleString()}</td>
                <td>₹{projection.deathBenefit.toLocaleString()}</td>
                <td>₹{projection.maturityBenefit.toLocaleString()}</td>
                <td>₹{projection.surrenderValue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn btn-secondary mt-3"
        onClick={() => navigate(`/policies/${id}/illustration`)}
      >
        Back to Form
      </button>
    </div>
  );
};

export default IllustrationResult;