import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Switch, NavLink } from 'react-router-dom';


import { getAllListings } from '../../store/listings';
import ProfileListings from '../Profile/ProfileListings';
import './SessionProfile.css';
import placeholder from '../../images/vinyl.jpg'
import avatar from '../../images/avatar.svg'
import GoBackButton from '../Utils/GoBackButton';
import ProtectedRoute from '../auth/ProtectedRoute';
import GetUserOrders from '../Orders/GetUsersOrders';
import UploadProfilePicture from './UploadProfilePicture';


function SessionProfile({ user }) {
    const dispatch = useDispatch()
    // const url = window.location.href

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
                    <img className='profile-img-heading' src={user?.profile_img_url ? user?.profile_img_url : avatar} alt='profile' />
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
                    <div>
                        <strong>Address:</strong> {user?.address}
                    </div>
                    <div>
                        <strong>City:</strong> {user?.city}
                    </div>
                    <div>
                        <strong>State:</strong> {user?.state}
                    </div>
                    <div>
                        <strong>Zip code:</strong> {user?.zip_code}
                    </div>
                    <div>
                        <strong>Country:</strong> {user?.country}
                    </div>
                </div>
                <div className='session-heading-button-container'>
                    <button className='session-heading-button session-heading-button-edit'>Edit profile</button>
                    <UploadProfilePicture />
                </div>
            </section>
            <div className='session-profile-link-container'>
                <NavLink exact={true} to='/user/profile'>Your Listings</NavLink>
                <NavLink to='/user/profile/orders'>Your Orders</NavLink>
            </div>
            <Switch>
                <ProtectedRoute exact={true} path='/user/profile' >
                    <ProfileListings listingsList={listingsList} userId={user?.id} />
                </ProtectedRoute>
                <ProtectedRoute path='/user/profile/orders'>
                    <GetUserOrders user={user} />
                </ProtectedRoute>
            </Switch>
        </main>
    )
}

export default SessionProfile;
