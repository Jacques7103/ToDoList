import React, { useState, useEffect } from 'react';
import '../styles/reset.css';
import { sendPasswordReset, auth } from './Firebase';
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-form-wrapper">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={sendPasswordReset(email)} type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Reset Password'}</button>
        </form>
        <div className='link'>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
        {isSuccess && <p className="success-message">An email has been sent to your account with instructions on how to reset your password.</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
