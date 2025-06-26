import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './components/Common/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PolicyList from './components/Policy/PolicyList';
import PolicyDetails from './components/Policy/PolicyDetails';
import IllustrationForm from './components/Illustration/IllustrationForm';
import IllustrationResult from './components/Illustration/IllustrationResult';
import PrivateRoute from './components/Common/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
     
      <div className="main-content" style={{ minHeight: 'calc(100vh - 120px)' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/policies" element={<PolicyList />} />
            <Route path="/policies/:id" element={<PolicyDetails />} />
            <Route path="/policies/:id/illustration" element={<IllustrationForm />} />
            <Route path="/illustrations/:id/result" element={<IllustrationResult />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;