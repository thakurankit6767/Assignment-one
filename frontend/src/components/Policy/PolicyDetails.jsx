import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPolicyById } from '../../services/policyService';

const PolicyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const data = await getPolicyById(id);
        setPolicy(data);
      } catch (err) {
        console.error('Failed to fetch policy:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!policy) {
    return <div className="container mt-5">Policy not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>{policy.policyName}</h2>
          <span className="badge bg-primary">{policy.policyType}</span>
        </div>
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-6">
              <h5>Policy Details</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Sum Assured:</strong> ₹{policy.sumAssured.toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Base Premium:</strong> ₹{policy.basePremium.toLocaleString()}
                </li>
                <li className="list-group-item">
                  <strong>Term:</strong> {policy.term} years
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Benefits</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Death Benefit:</strong> ₹{policy.benefits.deathBenefit?.toLocaleString() || 'N/A'}
                </li>
                <li className="list-group-item">
                  <strong>Maturity Benefit:</strong> ₹{policy.benefits.maturityBenefit?.toLocaleString() || 'N/A'}
                </li>
                <li className="list-group-item">
                  <strong>Surrender Value:</strong> ₹{policy.benefits.surrenderValue?.toLocaleString() || 'N/A'}
                </li>
              </ul>
            </div>
          </div>

          {policy.riders.length > 0 && (
            <div className="mb-4">
              <h5>Riders</h5>
              <div className="row">
                {policy.riders.map((rider, index) => (
                  <div key={index} className="col-md-4 mb-3">
                    <div className="card h-100">
                      <div className="card-body">
                        <h6 className="card-title">{rider.name}</h6>
                        <p className="card-text">{rider.description}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            Premium: ₹{rider.premium.toLocaleString()}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-secondary"
              onClick={() => navigate('/policies')}
            >
              Back to Policies
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/policies/${id}/illustration`)}
            >
              Calculate Benefits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;