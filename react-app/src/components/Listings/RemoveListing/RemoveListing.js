

import './RemoveListing.css'

function RemoveListing({ listing, handleDelete }) {


    return(
        <>
             <button className='remove-listing-profile' id={listing?.id} onClick={handleDelete}>Remove Listing</button>
        </>
    )
}

export default RemoveListing;
