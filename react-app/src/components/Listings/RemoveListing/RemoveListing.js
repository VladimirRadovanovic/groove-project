

import './RemoveListing.css'
import { ConfirmModal } from '../../../context/Modal';

function ConfirmRemoveListing({ id, handleDelete, onClose }) {


    return(
        // <>
        //      <button className='remove-listing-profile' id={id} onClick={handleDelete}>Remove Listing</button>
        // </>

        <ConfirmModal onClose={onClose}>
        <h3>Are you sure you would like to remove this listing?</h3>
        <div className="confirm-button-container">
        <button className="confirm-delete" id={id} onClick={handleDelete}>Yes</button>
        <button className="cancel-delete" onClick={onClose}>No</button>
        </div>
    </ConfirmModal>
    )
}

export default ConfirmRemoveListing;
