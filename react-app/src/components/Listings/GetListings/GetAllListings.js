import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllListings } from '../../../store/listings';
import placeholder from '../../../images/vinyl.jpg'

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
        <>
        <h2 className='section-3-title'>RECORDS</h2>
        <div className='splash-article-container'>
                {listingsList?.map(listing => (
                    <article className='section-3-article' key={listing?.id}>
                        <div className='section-3-img-container'>
                            <img src={listing?.images?.img_url ? listing?.images?.img_url : placeholder}
                             className='section-3-img' alt='record' />
                        </div>
                        {listing?.id}
                        {listing?.album}
                        {listing?.artist}
                        {listing?.genre}
                        {listing?.description}
                    </article>
                ))}

        </div>
        </>
    )
}

export default GetAllListings;
