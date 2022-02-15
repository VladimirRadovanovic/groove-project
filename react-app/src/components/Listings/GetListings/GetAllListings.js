import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListings } from '../../../store/listings';

import './GetAllListings.css'

function GetAllListings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(getAllListings())
    }, [user])
    const listings = useSelector(state => state.listings)
    const listingsList = Object.values(listings)


    return (
        <div className='listings-list'>
            <ul>
            {listingsList?.map(listing => (
                <li key={listing.id}>
                    {listing.id}
                    {listing.album}
                    {listing.album}
                    {listing.album}
                    {listing.album}
                </li>
            ))}
            </ul>
        </div>
    )
}

export default GetAllListings;
