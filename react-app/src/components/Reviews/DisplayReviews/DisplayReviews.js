import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './DisplayReviews.css'
import { getListingReviews } from '../../../store/reviews';
import DeleteReview from '../DeleteReview/DeleteReview';
import avatar from '../../../images/avatar.svg'

function DisplayReviews({ listing, reviewsList }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [showModal, setShowModal] = useState(false)
    const [reviewId, setReviewId] = useState('')

    const onClose = () => {
        setShowModal(false)
    }

    const onOpen = (e) => {
        setReviewId(Number(e.target.id.split('-')[1]))
        setShowModal(true)
    }

    const stars = [
        1, 2, 3, 4, 5
    ]
    const { recordId } = useParams()
    const listingId = Number(recordId)
    // useEffect(() => {
    //     if(listing) {

    //         dispatch(getListingReviews(listingId))
    //     }
    // }, [recordId])

    // const reviews = useSelector(state => state.reviews)
    // const reviewsList = Object.values(reviews)


    return (
        <section className='display-reviews-section'>
            <div id='reviews' className='display-reviews-container'>
                <h3 id='customer-reviews'>Customer reviews</h3>
                <NavLink className='leave-review-link' to={`/records/${listing?.id}/review`}>Leave a Review</NavLink>
                <div>
                    {reviewsList.map(review => (
                        <div className='single-review-container' key={review.id}>
                            <div className='display-reviewer-container'>
                                <img className='reviewer-img' src={review?.user?.profile_img_url ? review?.user?.profile_img_url : avatar} />
                                <p className='reviewer-name'>{review?.user?.username}</p>
                            </div>
                            <div className='review-headline-container'>
                                <div className='display-star-container'>
                                    {stars.map((num) => (
                                        <span key={`star-${num}`}>
                                            {review?.rating < num ?
                                                (<i className={`fa-solid fa-star star-display-reviews`}></i>)
                                                :
                                                (<i className={`fa-solid fa-star star-display-reviews review-display--fill`}></i>)
                                            }
                                        </span>

                                    ))}

                                </div>
                                <p className='display-headline'><strong>{review?.headline}</strong></p>
                            </div>
                            <p>Reviewed on {new Date(review?.created_at).toDateString()}</p>
                            <p>{review?.review}</p>
                            {user?.id === review?.user?.id && (
                                 <div>
                                    <button id={`review-${review?.id}`} className="delete-review-button" onClick={onOpen}>Delete Review</button>
                                    <NavLink to={`/reviews/${review?.id}/edit-review`}>Edit Review</NavLink>
                                 </div>

                                // <DeleteReview id={review?.id} />
                            )}
                        </div>
                    ))}
                    {showModal &&  (
                        <DeleteReview id={reviewId} onClose={onClose} />
                    )}
                    {reviewsList?.length === 0 && (
                        <div className='let-us-know-container'>
                            <p>This record has not been reviewed. <NavLink to={`/records/${listing?.id}/review`} >Please let us know what you think of it.</NavLink></p>
                        </div>
                    )}
                </div>
            </div>

        </section>
    )

}

export default DisplayReviews;
