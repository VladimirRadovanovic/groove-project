import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { deleteListing } from "../../store/listings";


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
        <>
            <ul>
                {profileListings?.map(listing => (
                    <li key={listing?.id}>
                        {listing?.id}
                        {listing?.album}
                        {listing?.artist}
                        {listing?.genre}
                        {listing?.description}
                        <button id={listing?.id} onClick={handleDelete}>Delete</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ProfileListings;
