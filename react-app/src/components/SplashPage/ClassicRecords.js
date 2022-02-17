import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './ClassicRecords.css'
import { getAllListings } from '../../store/listings';
import placeholder from '../../images/vinyl.jpg'


function GetClassicRecords({ user }) {
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
            <div className='splash-article-container'>
                {listingsList?.map(listing => (
                    <article className='section-3-article article' key={listing?.id}>
                        <div className='article-side article-front'>
                            <div className='section-3-img-container article-img-container'>
                                <img src={listing?.images?.img_url ? listing?.images?.img_url : placeholder}
                                    className='section-3-img article-img' alt='record' />
                            </div>
                            {listing?.id}
                            {listing?.album}
                            {listing?.artist}
                            {listing?.genre}
                            {listing?.description}
                        </div>
                        <div className='article-side article-back'>
                                <button id={listing?.id} className='cart-button'>Add to Cart</button>
                                <NavLink to={`/records/${listing?.id}/details`} className='details-link'>View Details</NavLink>
                        </div>
                    </article>
                ))}

            </div>
        </section>
    )
}

export default GetClassicRecords;
