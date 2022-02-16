import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllListings } from '../../../store/listings';

import './GetAllListings.css'

function GetAllListings({ user }) {
    const dispatch = useDispatch()
    const url = window.location.href

    useEffect(() => {
        dispatch(getAllListings())
    }, [user, url])
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
        <div className='listings-list'>
            <ul>
                {listingsList?.map(listing => (
                    <li key={listing?.id}>
                        {listing?.id}
                        {listing?.album}
                        {listing?.artist}
                        {listing?.genre}
                        {listing?.description}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GetAllListings;
