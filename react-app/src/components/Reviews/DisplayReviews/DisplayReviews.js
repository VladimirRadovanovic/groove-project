import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './DisplayReviews.css'
import { getListingReviews } from '../../../store/reviews';
import DeleteReview from '../DeleteReview/DeleteReview';
import avatar from '../../../images/avatar.svg'

function DisplayReviews( { listing }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const stars = [
    1, 2, 3, 4, 5
    ]

    useEffect(() => {
        if(listing) {

            dispatch(getListingReviews(listing?.id))
        }
    }, [])

    const reviews = useSelector(state => state.reviews)
    const reviewsList = Object.values(reviews)


    return (
        <section className='display-reviews-section'>
            <div className='display-reviews-container'>
            <h2>Customer reviews</h2>
            <NavLink to={`/records/${listing?.id}/review`}>Leave a Review</NavLink>
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
                                    ( <i className={`fa-solid fa-star star-display-reviews review-display--fill`}></i>)
                                    }
                                </span>

                            ))}

                            </div>
                        <p className='display-headline'><strong>{review?.headline}</strong></p>
                        </div>
                        <p>Reviewed on {new Date(review?.created_at).toDateString()}</p>
                        <p>{review?.review}</p>
                        {user?.id === review?.user?.id && (

                        <DeleteReview id={review?.id} />
                        )}
                    </div>
                ))}
            </div>
            </div>
        </section>
    )

}

export default DisplayReviews;
