import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)


  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState([])
  const [frontErrors, setFrontErrors] = useState(false)

  useEffect(() => {
    const errors = []
    if (!firstName) errors.push('Name required')
    if (firstName.length < 2 || firstName.length > 15) errors.push('First name char. limit(min:2, max:15)')
    if (!lastName) errors.push('Last name required')
    if (lastName.length < 2 || lastName.length > 10) errors.push('Last name char. limit(min:2, max:15)')
    if (!email) errors.push('Email required')
    if (!username) errors.push('Username required')
    else if (username < 5 || username > 20) errors.push('Username character limit(mix:5, max:20')
    if (!password) errors.push('Password required')
    if (!confirmPassword) errors.push('Please confirm password')
    if (password !== confirmPassword) errors.push('Passwords do not match')
    setValidationErrors(errors)
  }, [firstName, lastName, email, username, password, confirmPassword])

  if (sessionUser) return <Redirect to="/" />

  const handleSubmit = (e) => {
    e.preventDefault();
    setFrontErrors(true)
    if (!validationErrors.length)
      if (password === confirmPassword) {
        setErrors([]);
        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      } else {
        setFrontErrors(false)
        return setErrors(['Confirm Password field must be the same as the Password field']);
      }
  };

  return (
    <div className="sign-up-outer-most">
      <form onSubmit={handleSubmit} >
        <h4 id="welcome-signup"> Sign up for Dirt-BnB Today!</h4>

        <div className="sign-up-form-content-area">
          <input
            className="input"
            placeholder="First Name"
            type="text"
            min='2'
            max='15'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required />


          <input
            className="input"
            placeholder="Last Name"
            min='2'
            max='10'
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required />


          <input
            className="input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />


          <input
            className="input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />


          <input
            className="input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />


          <input
            className="input"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />

          <button className="sign-up-jin-pink-buttons" type="submit">Sign Up</button>
        </div>
        <ul className="sign-up-errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <ul>
          {frontErrors && validationErrors.length > 0 && validationErrors.map(error => (
            <li className="error-messages" key={error}>{error}</li>))}
        </ul>
      </form>
    </div>
  );
}

export default SignupFormPage;