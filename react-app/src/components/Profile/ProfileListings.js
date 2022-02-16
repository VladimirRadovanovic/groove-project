import React, { useState } from "react";
// import { useParams } from "react-router-dom";


function ProfileListings({ listingsList, userId }) {

    const profileListings = listingsList.filter(listing => (
        listing.seller_id === Number(userId)
    ))

    console.log(profileListings, 'profile liatings')
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
                    </li>
                ))}
            </ul>
        </>
    )
}

export default ProfileListings;
