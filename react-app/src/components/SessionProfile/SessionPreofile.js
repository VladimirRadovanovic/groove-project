import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getAllListings } from '../../store/listings';
import ProfileListings from '../Profile/ProfileListings';
import './SessionProfile.css';
import placeholder from '../../images/vinyl.jpg'

function SessionProfile({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllListings())
      }, [dispatch, user])


      const listings = useSelector(state => state.listings)
      const listingsList = Object.values(listings)


      if (!user) {
        return null;
      }

    return (
        <main>
        <section className='profile-header'>
          <div className='profile-img-container-heading'>
            <img className='profile-img-heading' src={placeholder} alt='profile' />
          </div>
          <div className='profile-info-container'>
            <div>
            </div>
            <div>
              <strong>Username:</strong> {user.username}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
          </div>
        </section>
        <ProfileListings listingsList={listingsList} userId={user.id} />
      </main>
    )
}

export default SessionProfile;
