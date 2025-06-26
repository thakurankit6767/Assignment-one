import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    mobile: '',
    dob: ''
  });
  const { register, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, password, email, mobile, dob } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={onSubmit}>
                <div className="form-group mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="mobile"
                    value={mobile}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={dob}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
              </form>
              <p className="mt-3 text-center">
                Already have an account?{' '}
                <span
                  style={{ cursor: 'pointer', color: 'blue' }}
                  onClick={() => navigate('/login')}
                >
                  Login here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;