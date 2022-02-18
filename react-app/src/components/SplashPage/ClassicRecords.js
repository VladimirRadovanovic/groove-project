import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './ClassicRecords.css'
import { getAllListings } from '../../store/listings';
import placeholder from '../../images/vinyl.jpg'
import DisplayListings from '../Listings/DisplayListings/DisplayListings';


function GetClassicRecords({ user, numItemSetter }) {
    const dispatch = useDispatch()
    const url = window.location.href

    useEffect(() => {
        dispatch(getAllListings())
    }, [user, dispatch])

    const listings = useSelector(state => state.listings)
    let listingsList;
    if (!user) {
        listingsList = Object.values(listings).slice(0, 10)
    }
    if (user) {
        listingsList = Object.values(listings).filter(listing => (
            listing.seller_id !== user.id
        )).slice(0, 10)
    }

    return (
        <section className='splash-section-3'>
            <h2 className='section-3-title section-title margin-bottom-small'>CLASSIC RECORDS</h2>
            <DisplayListings listingsList={listingsList} numItemSetter={numItemSetter} />
            <NavLink to='/records/all' className='section-3-more-link'>SEE MORE</NavLink>
        </section>
    )
}

export default GetClassicRecords;
