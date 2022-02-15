import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListings } from '../../../store/listings';

function GetAllListings() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllListings())
    }, [])
    const listings = useSelector(state => state.listings)
    const listingsList = Object.values(listings)
    console.log(listingsList, 'list')

    return (
        <div className='listings-list'>
            {listingsList?.map(listing => {
                <div key={listing.id}>{listing.artist}</div>
            })}
        </div>
    )
}

export default GetAllListings;
