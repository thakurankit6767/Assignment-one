import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5">
      <div className="container py-4">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              Providing insurance solutions for your financial security and peace
              of mind.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/policies" className="text-white">
                  Policies
                </a>
              </li>
              <li>
                <a href="/login" className="text-white">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-white">
                  Register
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <address>
              <strong>Insurance Company</strong>
              <br />
              123 Main Street
              <br />
              City, State 10001
              <br />
              <abbr title="Phone">P:</abbr> (123) 456-7890
            </address>
          </div>
        </div>
        <div className="text-center pt-3 border-top">
          <p className="mb-0">&copy; {new Date().getFullYear()} Insurance Company</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;