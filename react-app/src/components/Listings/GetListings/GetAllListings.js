import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { getAllListings } from '../../../store/listings';
import placeholder from '../../../images/vinyl.jpg'
import DisplayListings from '../DisplayListings/DisplayListings';

import './GetAllListings.css'

function GetAllListings({ user }) {
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
        <h2 className='section-3-title'>RECORDS</h2>
            <DisplayListings listingsList={listingsList} />
        </main>
    )
}

export default GetAllListings;
