import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import LogoutButton from '../auth/LogoutButton';
import './DropdownMenu.css'
import logo from '../../images/logo.svg'


function DropdownMenu() {

    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    useEffect(() => {
        if (!showMenu) return;

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    return (
        <>
            {user ? (
                <>
                    <button className="profile-button" onClick={openMenu}>
                        <i className="fas fa-bars bars" />
                        <div className="profile-img-container">
                            <img className="profile-img" src={user ? user.profileImgUrl ? user.profileImgUrl : logo : logo} alt='profile picture' />
                        </div>
                    </button>
                    {showMenu && (

                        <div className="profile-dropdown">
                            <div className="user-profile-link-container">
                                <NavLink className='profile-link' to='/api/user/profile' >Profile</NavLink>
                            </div>
                            <div>
                                <LogoutButton />
                            </div>
                        </div>

                    )}
                </>
            ) : (
                <>
                    <button className="profile-button" onClick={openMenu}>
                        <i className="fas fa-bars bars" />
                        <div className="profile-img-container">
                            <img className="profile-img" src={logo} alt='profile picture placeholder' />
                        </div>

                    </button>
                    {showMenu && (
                        <div className="profile-dropdown">
                            {/* <div><button className="login-button" onClick={() => setShowLoginModal(true)}>Log In</button></div>
                            <div><button onClick={() => setShowSignupModal(true)}>Sign Up</button></div> */}
                            <div><NavLink className='profile-link' to='/login'>Login</NavLink></div>
                            <div><NavLink className='profile-link' to='/sign-up'>Create Account</NavLink></div>
                        </div>

                    )}
                </>
            )

            }
        </>
    )

}

export default DropdownMenu;
