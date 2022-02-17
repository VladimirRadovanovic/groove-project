import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileListings from './ProfileListings';
import { getAllListings } from '../../store/listings';
import './Profile.css'
import placeholder from '../../images/vinyl.jpg'

function Profile() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId, dispatch]);


  useEffect(() => {
    dispatch(getAllListings())
  }, [userId, dispatch])


  const listings = useSelector(state => state.listings)
  const listingsList = Object.values(listings)


  if (!user) {
    return null;
  }


  return (
    <main>
      <section className='profile-header'>
        <div className='profile-img-container'>
          <img className='profile-img' src={placeholder} alt='profile' />
        </div>
        <div className='profile-info-container'>
          <div>
          </div>
          <div>
            <strong>Username</strong> {user.username}
          </div>
          <div>
            <strong>Email</strong> {user.email}
          </div>
        </div>
      </section>
      <ProfileListings listingsList={listingsList} userId={userId} />
    </main>
  );
}
export default Profile;
