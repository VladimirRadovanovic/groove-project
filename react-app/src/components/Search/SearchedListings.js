import { useState } from "react";

import DisplayListings from "../Listings/DisplayListings/DisplayListings";
import GoBackButton from "../Utils/GoBackButton";

function SearchedListings({ searchedListings, numItemSetter, searchedList }) {
    

    return (
        <main className="searched-listings-main">
            <GoBackButton />
            <h2 className="search-title">SEARCHED RECORDS</h2>
            <DisplayListings listingsList={searchedListings} numItemSetter={numItemSetter} searchedList={searchedList} />
        </main>
    )
}

export default SearchedListings;
