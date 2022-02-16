import React, { useState } from "react";
// import { useParams } from "react-router-dom";


function ProfileListings({ listingsList, userId }) {

    const profileListings = listingsList.filter(listing => (
        listing.seller_id === Number(userId)
    ))

    console.log(profileListings, 'profile liatings')
    return (
        <>
        </>
    )
}

export default ProfileListings;
