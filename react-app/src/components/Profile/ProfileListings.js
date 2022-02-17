import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { deleteListing } from "../../store/listings";
import RemoveListing from "../Listings/RemoveListing/RemoveListing";
import EditListing from "../Listings/EditListing/EditListing";
import placeholder from '../../images/vinyl.jpg'


function ProfileListings({ listingsList, userId }) {
    const dispatch = useDispatch()
    const profileListings = listingsList.filter(listing => (
        listing.seller_id === Number(userId)
    ))

    const handleDelete = (e) => {
        const id = Number(e.target.id)
        dispatch(deleteListing(id))
    }

    // pre push

    return (
        <section className="profile-listings-section">
            <div className="profile-listings-article-container">
                {profileListings?.map(listing => (
                    <article className="profile-listings-article" key={listing?.id}>
                        <div className="profile-article-img-container">
                            <img className="profile-article-img" src={placeholder} />
                        </div>
                        <div className="profile-listings-info-container">
                            <div className="profile-article-album-data">
                                <p className="article-album-first">
                                    {listing?.album}
                                </p>
                                <p>
                                    {listing?.artist}
                                </p>
                                <p>
                                    {listing?.genre}
                                </p>
                                <p>
                                    {listing?.price}
                                </p>
                            </div>
                            <div className="profile-article-description">
                                <p className="article-album-first">
                                    Description:
                                </p>
                                <p>
                                {listing?.description}
                                </p>
                            </div>
                        </div>
                        <div className="profile-listings-button-container">
                            <NavLink to={`/records/${listing?.id}/details`}>View Details</NavLink>
                            <EditListing listing={listing} userId={userId} />
                            <RemoveListing listing={listing} handleDelete={handleDelete} />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default ProfileListings;
