import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import validator from 'validator';

function Register() {
  initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [isEmailUsed, setIsEmailUsed] = useState(false);

  const auth = getAuth();

  const validateEmail = (email) => {
    return validator.isEmail(email);
  };

  const validatePassword = (password) => {
    return validator.isLength(password, { min: 6 });
  };

  const ctaClickHandler = (e) => {
    e.preventDefault();

    if (!validateEmail(email) || !validatePassword(password)) {
      setEmailValid(validateEmail(email));
      setPasswordValid(validatePassword(password));
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate('/dashboard');
        }
      })
      .catch((error) => setIsEmailUsed(true));
  };

  useEffect(() => {
    setIsEmailUsed(false);
  }, []);

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">Register</h1>
        <br />
        <form>
          <input
            className="form-control"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="Email"
          />
          {!emailValid && <p className="text-danger">Email is invalid/blank</p>}
          <input
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          {!passwordValid && <p className="text-danger">Password is invalid/blank</p>}
          <button className="btn btn-danger btn-block" onClick={ctaClickHandler}>
            Register
          </button>
          <br />
        </form>
        <br />
        {isEmailUsed && <p className="text-danger">Email already in use | Go for Sign In</p>}
        <div className="login-form-other">
          <div className="login-signup-now">
            Existing User?&nbsp;
            <Link to="/login">Sign In</Link>.
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
}

export default Register;
