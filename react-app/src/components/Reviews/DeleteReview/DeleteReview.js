import { useDispatch } from "react-redux";

import { deleteReview } from "../../../store/reviews";
import './DeleteReview.css'
import { ConfirmModal } from "../../../context/Modal";

function DeleteReview({ id, onClose }) {
    const dispatch = useDispatch()
    const handleDeleteReview = async() => {
        await dispatch(deleteReview(id))
        onClose()
    }

    return (
        // <div>
        //     <button className="delete-review-button" onClick={handleDeleteReview}>Delete Review</button>
        // </div>
        <ConfirmModal onClose={onClose}>
        <h3>Are you sure you would like to delete this review?</h3>
        <div className="confirm-button-container">
        <button className="confirm-delete" id={id} onClick={handleDeleteReview}>Yes</button>
        <button className="cancel-delete" onClick={onClose}>No</button>
        </div>
         </ConfirmModal>
    )
}

export default DeleteReview;
