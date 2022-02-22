import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, Link } from 'react-router-dom';
import { signUp, login } from '../../store/session';

import './AuthForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip_code, setZip_code] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('');
  const [repeat_password, setRepeat_password] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [validClass, setValidClass] = useState('')
  const [validRepeat_password, setValidRepeat_password] = useState('')
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  useEffect(() => {
    if (password.length < 6 && password.length > 0) {
      setValidClass('input-invalid')
    } else {
      setValidClass('')
    }

    if ((repeat_password.length < 6 && repeat_password.length > 0) || (repeat_password !== password && repeat_password.length > 0)) {
      setValidRepeat_password('repeat-input-invalid')
    } else {
      setValidRepeat_password('')
    }

    if (email.includes('@') && password.length >= 6 && password === repeat_password) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [email, password, repeat_password])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeat_password) {

      const data = await dispatch(signUp(username, email, password, repeat_password,
        address, city, state, zip_code, country
        ));
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

  const updateAddress = (e) => {
    setAddress(e.target.value)
  }

  const updateCity = (e) => {
    setCity(e.target.value)
  }

  const updateState = (e) => {
    setState(e.target.value)
  }

  const updateZip_code = (e) => {
    setZip_code(e.target.value)
  }

  const updateCountry = (e) => {
    setCountry(e.target.value)
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeat_password = (e) => {
    setRepeat_password(e.target.value);
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
          <div className='auth-errors-container'>
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
            <label htmlFor='address-signup'>Address</label>
            <input
              placeholder='Address'
              id='address-signup'
              type='text'
              name='address'
              onChange={updateAddress}
              value={address}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='city-signup'>City</label>
            <input
              placeholder='City'
              id='city-signup'
              type='text'
              name='city'
              onChange={updateCity}
              value={city}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='state-signup'>State</label>
            <input
              placeholder='State (Example: MA)'
              id='state-signup'
              type='text'
              name='state'
              onChange={updateState}
              value={state}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='zip_code-signup'>Zip code</label>
            <input
              placeholder='Zip code'
              id='zip_code-signup'
              type='text'
              name='zip_code'
              onChange={updateZip_code}
              value={zip_code}
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='country-signup'>Country</label>
            <input
              placeholder='Country'
              id='country-signup'
              type='text'
              name='country'
              onChange={updateCountry}
              value={country}
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
              className={validRepeat_password}
              placeholder='*********'
              id='repeat_password'
              type='password'
              name='repeat_password'
              onChange={updateRepeat_password}
              value={repeat_password}
              required={true}
            ></input>
          </div>
          <div className='form-button-container margin-bottom-small signup-button'>
            <button type='submit'>Register</button>
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
