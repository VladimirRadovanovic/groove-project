import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Switch, NavLink } from 'react-router-dom';


import { getAllListings } from '../../store/listings';
import ProfileListings from '../Profile/ProfileListings';
import './SessionProfile.css';

import avatar from '../../images/avatar.svg'
import GoBackButton from '../Utils/GoBackButton';
import ProtectedRoute from '../auth/ProtectedRoute';
import GetUserOrders from '../Orders/GetUsersOrders';
import UploadProfilePicture from './UploadProfilePicture';
import EditUserProfile from './EditUserProfile';
import FollowersModal from '../Follows/FollowersModal';
import FollowingModal from '../Follows/FollowingModal';


function SessionProfile({ user }) {
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [showFollowsModal, setShowFollowsModal] = useState(false)
    const [showFollowingModal, setShowFollowingModal] = useState(false)
    // const url = window.location.href

    useEffect(() => {
        dispatch(getAllListings())
    }, [dispatch, user])

    const onOpen = (e) => {
        setShowModal(true)
    }

    const onClose = () => {
        setShowModal(false)
    }

    const onCloseFollowsModal = () => {
        setShowFollowsModal(false)
    }
    const onCloseFollowingModal = () => {
        setShowFollowingModal(false)
    }

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
                        <span onClick={() => setShowFollowsModal(true)}>Followers {Object.keys(user?.followers).length}</span>
                        <span onClick={() => setShowFollowingModal(true)}>Following {Object.keys(user?.following).length}</span>

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
                    <button onClick={onOpen} id={`user-${user?.id}`} className='session-heading-button session-heading-button-edit'>Edit profile</button>
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
            {showModal && (
                <EditUserProfile onClose={onClose} user={user} />
            )}

            {showFollowsModal && (
                <FollowersModal onClose={onCloseFollowsModal} user={user} />
            )}
            {showFollowingModal && (
                <FollowingModal onClose={onCloseFollowingModal} user={user} />
            )}
        </main>
    )
}

export default SessionProfile;
