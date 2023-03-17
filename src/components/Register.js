import React, { useState, useEffect } from "react";
import "../styles/register.css";
import { auth, registerWithEmailAndPassword } from "./Firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if(loading){
      return
    } if(user) navigate("/dashboard", {replace:true});
  }, [user, loading])

  const register = () => {
    registerWithEmailAndPassword((firstName + " " + lastName), email, password)
    // console.log((firstName + " " + lastName), email, password)
  }

  return (
    <div className="register">
      <form onSubmit={register}>
        <h2 className="register-text">Register</h2>
        <label>
          First Name:
        </label>
        <input
            type="text"
            value={firstName}
            placeholder='Enter First Name'
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        <label>
          Last Name:
        </label>
        <input
            type="text"
            value={lastName}
            placeholder='Enter Last Name'
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        <label>
          Email:
        </label>
        <input
            type="email"
            value={email}
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label>
          Password:
        </label>
        <input
            type="password"
            value={password}
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit">Register</button>
        <div className="link">
          Already have an account? <Link to="/">Login</Link> now.
        </div>
      </form>
    </div>
  );
}

export default Register;
