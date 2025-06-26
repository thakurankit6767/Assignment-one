
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="jumbotron text-center">
        <h1 className="display-4">Welcome to Benefit Illustration</h1>
        <p className="lead">
          Explore our insurance policies and calculate your benefits
        </p>
        <hr className="my-4" />
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link to="/policies" className="btn btn-primary btn-lg px-4 gap-3">
            View Policies
          </Link>
          <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
            Login
          </Link>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Term Insurance</h5>
                <p className="card-text">
                  Affordable protection for your family's financial security.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Whole Life</h5>
                <p className="card-text">
                  Lifetime protection with cash value accumulation.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Endowment Plans</h5>
                <p className="card-text">
                  Protection with guaranteed savings and returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;