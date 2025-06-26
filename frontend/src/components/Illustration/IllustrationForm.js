import React, { useState, useEffect,useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import { getPolicyById, calculateIllustration } from '../../services/policyService';

const IllustrationForm = () => {
  const { id } = useParams();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    age: '',
    premiumPaymentFrequency: 'Yearly',
    premiumAmount: ''
  });
  const [errors, setErrors] = useState([]);
  const { token, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchPolicy = async () => {
      try {
        const data = await getPolicyById(id, token);
        setPolicy(data);
        setFormData(prev => ({
          ...prev,
          premiumAmount: data.basePremium
        }));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id, token, isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        policyType: policy.policyType,
        sumAssured: policy.sumAssured,
        premiumPaymentTerm: policy.term,
        policyTerm: policy.term
      };

      const result = await calculateIllustration(data, token);
      navigate(`/illustrations/${id}/result`, { state: { illustration: result } });
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors([{ msg: 'An error occurred while calculating illustration' }]);
      }
    }
  };

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (!policy) {
    return <div className="container mt-5">Policy not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Benefit Illustration for {policy.policyName}</h2>
      <div className="card">
        <div className="card-body">
          {errors.length > 0 && (
            <div className="alert alert-danger">
              <ul className="mb-0">
                {errors.map((error, index) => (
                  <li key={index}>{error.msg}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Policy Type</label>
                <input
                  type="text"
                  className="form-control"
                  value={policy.policyType}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sum Assured</label>
                <input
                  type="text"
                  className="form-control"
                  value={`₹${policy.sumAssured.toLocaleString()}`}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Policy Term</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${policy.term} years`}
                  readOnly
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Premium Payment Term</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${policy.term} years`}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="18"
                  max="60"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Premium Payment Frequency</label>
                <select
                  className="form-select"
                  name="premiumPaymentFrequency"
                  value={formData.premiumPaymentFrequency}
                  onChange={handleChange}
                >
                  <option value="Yearly">Yearly</option>
                  <option value="Monthly">Monthly</option>
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Premium Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="premiumAmount"
                  value={formData.premiumAmount}
                  onChange={handleChange}
                  required
                  min={policy.basePremium}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Calculate Illustration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IllustrationForm;