

import DisplayListings from "../Listings/DisplayListings/DisplayListings";

function SearchedListings({ searchedListings, numItemSetter }) {

    return (
        <main>
            <DisplayListings listingsList={searchedListings} numItemSetter={numItemSetter} />
        </main>
    )
}

export default SearchedListings;
