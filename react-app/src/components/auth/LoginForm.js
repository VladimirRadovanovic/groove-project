import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { login } from '../../store/session';


import './AuthForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [validClass, setValidClass] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password.length < 6 && password.length > 0) {
      setValidClass('input-invalid')
    } else {
      setValidClass('')
    }
    if (email.includes('@') && password.length >= 6) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [email, password])




  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  const handleDemo = (e) => {
    e.preventDefault()
    const email = 'demo@aa.io'
    const password = 'password'
    dispatch(login(email, password))
  }

  return (
    <main className='auth-form-page'>
      <div className='login-form-container form-container'>
        <form className='login-form auth-form' onSubmit={onLogin}>
          <h2 className='form-header margin-bottom-small'>
            Login
          </h2>
          <p className='margin-bottom-small'>Don't have an account?<Link to='/sign-up'> Register here</Link> </p>
          <div className='auth-errors-container'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-group margin-bottom-small'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='name@email.com*'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-group margin-bottom-small'>
            <label htmlFor='password'>Password</label>
            <input
              className={validClass}
              id='password'
              name='password'
              type='password'
              placeholder='Password*'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='form-button-container margin-bottom-small login-button'>
            <button type='submit'>Login</button>
          </div>
          <div className='form-button-container margin-bottom-small demo-button'>
            <button type='button' onClick={handleDemo}>Demo login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
