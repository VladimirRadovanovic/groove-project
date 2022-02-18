import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg'

import './NavBar.css'
import DropdownMenu from './DropdownMenu';

const NavBar = () => {
  return (
    <nav>
      <div className='nav-container'>
          <div className='logo-container'>
            <NavLink className='logo-link' to='/' exact={true} activeClassName='active'>
              <img className='logo-img' src={logo} alt='logo'/> <h1 className='logo-text'>Groove</h1>
            </NavLink>
          </div>
          <div className='nav-right-container'>
            <NavLink className='shop-now-link-nav' to='/records/all'>Shop Now</NavLink>

          <div className='dropdown-button-container'>
            <DropdownMenu />
          </div>
          </div>
          {/* <div> */}
            {/* <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </div>
          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </div>
          <div>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </div>
          <div>
            <LogoutButton />
          </div> */}

      </div>
    </nav>
  );
}

export default NavBar;
