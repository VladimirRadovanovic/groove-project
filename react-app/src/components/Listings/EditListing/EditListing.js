import { NavLink } from 'react-router-dom';

import './EditListing.css'

function EditListing({ listing }) {
return (
    <>
        <NavLink className='edit-listing-profile' to={`/records/${listing?.id}/edit-record`}>Edit Listing</NavLink>
    </>
)
}


export default EditListing;
