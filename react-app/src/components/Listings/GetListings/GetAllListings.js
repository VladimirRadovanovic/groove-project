import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListings } from '../../../store/listings';

import './GetAllListings.css'

function GetAllListings() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllListings())
    }, [])
    const listings = useSelector(state => state.listings)
    const listingsList = Object.values(listings)
    console.log(listingsList[0], 'list')

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
