import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { getAllPolicies } from '../../services/policyService';

const PolicyList = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchPolicies = async () => {
      try {
        const data = await getAllPolicies(token);
        setPolicies(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [token, isAuthenticated, navigate]);

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Policies</h2>
      <div className="row">
        {policies.map((policy) => (
          <div key={policy._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{policy.policyName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{policy.policyType}</h6>
                <p className="card-text">
                  Sum Assured: ₹{policy.sumAssured.toLocaleString()}
                  <br />
                  Base Premium: ₹{policy.basePremium.toLocaleString()}
                  <br />
                  Term: {policy.term} years
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/policies/${policy._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyList;