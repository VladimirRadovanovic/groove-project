import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteListing } from "../../store/listings";
import RemoveListing from "../Listings/RemoveListing/RemoveListing";
import EditListing from "../Listings/EditListing/EditListing";


function ProfileListings({ listingsList, userId }) {
    const dispatch = useDispatch()
    const profileListings = listingsList.filter(listing => (
        listing.seller_id === Number(userId)
    ))

    const handleDelete = (e) => {
        const id = Number(e.target.id)
        dispatch(deleteListing(id))
    }

    return (
        <section>
            <ul>
                {profileListings?.map(listing => (
                    <li key={listing?.id}>
                        {listing?.id}
                        {listing?.album}
                        {listing?.artist}
                        {listing?.genre}
                        {listing?.description}
                        <RemoveListing listing={listing} handleDelete={handleDelete} />
                        <EditListing listing={listing} userId={userId} />
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default ProfileListings;
