import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileListings from './ProfileListings';
import { getAllListings } from '../../store/listings';

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
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
    <ProfileListings listingsList={listingsList} userId={userId} />
    </main>
  );
}
export default Profile;
