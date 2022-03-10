import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';


import logo from '../../images/logo.svg'

import './NavBar.css'
import DropdownMenu from './DropdownMenu';
import Search from '../Search/Search';

const NavBar = ({ length, user, handelSearchListings }) => {


  useEffect(() => {
    // setLength(cartItems.length)
  }, [length])

  return (
    <nav>
      <div className='nav-container'>
        <div className='logo-container'>
          <NavLink className='logo-link' to='/' exact={true} activeClassName='active'>
            <img className='logo-img' src={logo} alt='logo' /> <h1 className='logo-text'>Groove</h1>
          </NavLink>
        </div>
        <div>
          <Search handelSearchListings={handelSearchListings} />
        </div>
        <div className='nav-right-container'>
          <NavLink className='shop-now-link-nav' to={`/users/${user?.id}/records/sell-record`}>Sell Records</NavLink>
          <NavLink className='shop-now-link-nav' to='/records/all'>Shop Records</NavLink>
          <div className='cart-container'>
            {length > 0 ?
              <div className='cart-number'>
                {length}
              </div>
              :
              null}
            <NavLink to='/cart'>
              <i className="fa-solid fa-cart-shopping cart"></i>
            </NavLink>
          </div>
          <div className='dropdown-button-container'>
            <DropdownMenu />
          </div>
        </div>

      </div>
    </nav>
  );
}

export default NavBar;
