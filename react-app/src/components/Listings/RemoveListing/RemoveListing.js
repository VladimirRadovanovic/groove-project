

import './RemoveListing.css'

function RemoveListing({ listing, handleDelete }) {


    return(
        <>
             <button id={listing?.id} onClick={handleDelete}>Remove Listing</button>
        </>
    )
}

export default RemoveListing;
