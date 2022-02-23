import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



import { getAllListings } from '../../../store/listings';

import DisplayListings from '../DisplayListings/DisplayListings';
import GoBackButton from '../../Utils/GoBackButton';

import './GetAllListings.css'

function GetAllListings({ user, numItemSetter }) {
    const dispatch = useDispatch()
    const url = window.location.href

    useEffect(() => {
        dispatch(getAllListings())
    }, [user, url, dispatch])
    const listings = useSelector(state => state.listings)
    let listingsList;
    if (!user) {
        listingsList = Object.values(listings)
    }
    if (user) {
        listingsList = Object.values(listings).filter(listing => (
            listing.seller_id !== user.id
        ))
    }

    return (
        <main className='all-records-main'>
            <GoBackButton />
        <h2 className='section-3-title'>RECORDS</h2>
            <DisplayListings listingsList={listingsList} numItemSetter={numItemSetter} />
        </main>
    )
}

export default GetAllListings;
