import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import { auth, logInWithEmailAndPassword, signInWithGoogle } from './Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, showLogin] = useState(true);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading){
      return
    } if(user) navigate("/dashboard");
  }, [user, loading])

  const loginUser = () => {
    logInWithEmailAndPassword(email, password)
  }

  return (
    <div className="login-wrapper">
      <h2 className="login-heading">Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label className='texts' htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className='texts' htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button onClick={loginUser} type="submit" className="primary">Login with email</button>
        <button onClick={signInWithGoogle} className="btn-secondary">Login with Google</button>
        <div className="links-container">
            <Link to="/register" className="link-register">Register</Link>
            <span className="divider">|</span>
            <Link to="/reset" className="link-forgot-password">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;