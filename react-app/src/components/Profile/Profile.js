import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProfileListings from './ProfileListings';
import { getAllListings } from '../../store/listings';
// import GetAllListings from '../Listings/GetListings/GetAllListings';
import GoBackButton from '../Utils/GoBackButton';
import DisplayListings from '../Listings/DisplayListings/DisplayListings';
import './Profile.css'
import placeholder from '../../images/vinyl.jpg'

function Profile({ numItemSetter }) {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      if (user.errors) {
        setErrors(user.errors)

      } else {
        setUser(user);
      }
    })();
  }, [userId, dispatch]);


  useEffect(() => {
    dispatch(getAllListings())
  }, [userId, dispatch])


  const listings = useSelector(state => state.listings)
  const listingsList = Object.values(listings)
  const landedProfileListings = listingsList.filter(listing => (
    listing.seller_id === Number(userId)
  ))


  if (!user) {
    return null;
  }


  return (
    <main>
      <section className='profile-header'>
        <div className='profile-img-container-heading'>
          <img className='profile-img-heading' src={user?.profile_img_url ? user?.profile_img_url : placeholder} alt='profile' />
        </div>
        <div className='profile-info-container'>
          <div>
          </div>
          <div>
            <strong>Username:</strong> {user?.username}
          </div>
          <div>
            <strong>Email:</strong> {user?.email}
          </div>
        </div>
      </section>
      <div className='auth-errors-container' id='user-not-found'>
        {errors?.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <GoBackButton />
      <section className='other-users-profile-section'>
        <h2 className='for-sale-by-user'>All vinyl records for sale by {user?.username}. </h2>
        {landedProfileListings?.length === 0 && (
          <div className="none-available-container">
            <p className="none-available-text">This user has no vinyl records for sale at the moment.</p>
          </div>
        )}
        <DisplayListings listingsList={landedProfileListings} numItemSetter={numItemSetter} />

      </section>

    </main>
  );
}
export default Profile;
