

import './RemoveListing.css'

function RemoveListing({ listing, handleDelete }) {


    return(
        <>
             <button id={listing?.id} onClick={handleDelete}>Delete</button>
        </>
    )
}

export default RemoveListing;
