import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import validator from 'validator';

function Login() {
  initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === '/login' ? true : false;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserExist, setUserExist] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

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

    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          navigate('/dashboard');
        }
      })
      .catch((error) => setUserExist(true));
  };

  useEffect(() => {
    setUserExist(false);
  }, [location]);

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">Sign In</h1>
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
            Sign In
          </button>
          <br />
          {page && (
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
              <label className="form-check-label text-white" htmlFor="flexCheckDefault">
                Remember Me
              </label>
            </div>
          )}
        </form>
        <br />
        <br />
        {isUserExist && <p className="text-danger">User does not exist | Go for Signup</p>}
        <div className="login-form-other">
          <div className="login-signup-now">
            New to Netflix?&nbsp;
            <Link className="" to="/register">
              Sign up now
            </Link>
            .
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

export default Login;
