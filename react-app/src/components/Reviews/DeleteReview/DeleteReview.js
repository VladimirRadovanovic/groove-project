import { useDispatch } from "react-redux";


function DeleteReview({ id }) {
    const dispatch = useDispatch()
    const handleDeleteReview = async() => {
        await dispatch(deleteReview(id))
    }

    return (
        <div>
            <button onClick={handleDeleteReview}>Delete Review</button>
        </div>
    )
}

export default DeleteReview;
