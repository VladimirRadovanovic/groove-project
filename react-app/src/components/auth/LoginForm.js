import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

import './AuthForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if(email.includes('@') && password.length >= 6) {
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

  return (
    <main className='auth-form-page'>
      <div className='login-form-container form-container'>
        <form className='login-form auth-form' onSubmit={onLogin}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='name@email.com'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='*********'
              value={password}
              onChange={updatePassword}
            />
            <button disabled={buttonDisabled} type='submit'>Login</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
