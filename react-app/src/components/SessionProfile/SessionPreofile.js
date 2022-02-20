import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Switch } from 'react-router-dom';

import { getAllListings } from '../../store/listings';
import ProfileListings from '../Profile/ProfileListings';
import './SessionProfile.css';
import placeholder from '../../images/vinyl.jpg'
import GoBackButton from '../Utils/GoBackButton';
import ProtectedRoute from '../auth/ProtectedRoute';
import GetUserOrders from '../Orders/GetUsersOrders';


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
            <GoBackButton />
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
            <Switch>
                <ProtectedRoute exact={true} path='/user/profile' >
                    <ProfileListings listingsList={listingsList} userId={user.id} />
                </ProtectedRoute>
                <ProtectedRoute path='/user/profile/orders'>
                    <GetUserOrders user={user} />
                </ProtectedRoute>
            </Switch>
        </main>
    )
}

export default SessionProfile;
