import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GetAllListings from '../Listings/GetListings/GetAllListings'
import './ClassicRecords.css'
import { getAllListings } from '../../store/listings';
import placeholder from '../../images/vinyl.jpg'


function GetClassicRecords({ user }) {
    const dispatch = useDispatch()
    const url = window.location.href

    useEffect(() => {
        dispatch(getAllListings())
    }, [user])

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
            {/* <GetAllListings user={user} /> */}
            <h2 className='section-3-title section-title'>CLASSIC RECORDS</h2>
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
                                <label>Add to cart</label>
                        </div>
                    </article>
                ))}

            </div>
        </section>
    )
}

export default GetClassicRecords;
