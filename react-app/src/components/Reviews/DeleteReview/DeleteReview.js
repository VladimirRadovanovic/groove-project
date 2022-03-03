import { useDispatch } from "react-redux";

import { deleteReview } from "../../../store/reviews";
import './DeleteReview.css'

function DeleteReview({ id }) {
    const dispatch = useDispatch()
    const handleDeleteReview = async() => {
        await dispatch(deleteReview(id))
    }

    return (
        <div>
            <button className="delete-review-button" onClick={handleDeleteReview}>Delete Review</button>
        </div>
    )
}

export default DeleteReview;
