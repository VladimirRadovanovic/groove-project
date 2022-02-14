import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp, login } from '../../store/session';

import './AuthForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [validClass, setValidClass] = useState('')
  const [validRepeatPassword, setValidRepeatPassword] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password.length < 6 && password.length > 0) {
      setValidClass('input-invalid')
    } else {
      setValidClass('')
    }

    if (repeatPassword.length < 6 && repeatPassword.length > 0 || (repeatPassword !== password && repeatPassword.length > 0)) {
      console.log(password, repeatPassword)
      setValidRepeatPassword('repeat-input-invalid')
    } else {
      setValidRepeatPassword('')
    }

    if (email.includes('@') && password.length >= 6 && password === repeatPassword) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [email, password, repeatPassword])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleDemo = (e) => {
    e.preventDefault()
    const email = 'demo@aa.io'
    const password = 'password'
    dispatch(login(email, password))
  }


  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <main className='auth-form-page'>
      <div className='signup-form-container form-container'>
        <form className='signup-form auth-form' onSubmit={onSignUp}>
          <h2 className='form-header margin-bottom-small'>
            Create an Account
          </h2>
          <p className='margin-bottom-small'>Or <Link to='/login'> Login here</Link></p>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-group'>
            <label htmlFor='username'>User Name</label>
            <input
              placeholder='Username'
              id='username'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='email-signup'>Email</label>
            <input
              placeholder='name@email.com'
              id='email-signup'
              type='email'
              name='email'
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='password-signup'>Password</label>
            <input
              className={validClass}
              placeholder='*********'
              id='password-signup'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='repeat_password'>Repeat Password</label>
            <input
              className={validRepeatPassword}
              placeholder='*********'
              id='repeat_password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <div className='form-button-container margin-bottom-small signup-button'>
            <button disabled={buttonDisabled} type='submit'>Register</button>
          </div>
          <div className='form-button-container margin-bottom-small demo-button'>
            <button type='button' onClick={handleDemo}>Demo login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;
