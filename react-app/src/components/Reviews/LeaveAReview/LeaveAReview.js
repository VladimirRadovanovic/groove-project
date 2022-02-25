import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import './LeaveAReview.css'
import { getAllListings } from '../../../store/listings';
import placeholder from '../../../images/vinyl.jpg'
import { makeReview } from '../../../store/reviews';

function LeaveAReview({ user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [review, setReview] = useState('')
    const [headline, setHeadline] = useState('')
    const [rating, setRating] = useState('')
    const [errors, setErrors] = useState([])
    console.log(rating, 'headline***************')

    useEffect(() => {
        dispatch(getAllListings())
    }, [dispatch])

    const { recordId } = useParams()
    const listingId = Number(recordId)

    const listings = useSelector(state => state.listings)
    const reviewedListing = listings[listingId]

    const handleReview = (e) => {
        setReview(e.target.value)
    }

    const handleHeadline = (e) => {
        setHeadline(e.target.value)
    }


    const handleReviewSubmit = async(e) => {
        e.preventDefault()
        const listing_id = Number(e.target.id.split('-')[1])
        const payload = {
            listing_id,
            headline,
            review
        }
        const data = await dispatch(makeReview(payload))
        if(data) {
            setErrors(data)
            console.log(data, 'review error data*********')
        } else {
            history.push(`/records/${listingId}/details`)
        }

    }

    return (
        <main className='leave-review-main'>
            <div className='leave-review-container'>
            {/* <ul>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul> */}
            <h2 className='leave-review-heading'>
                Create review
            </h2>
            <div className='leave-review-info-container'>
                <img className='leave-review-img' src={reviewedListing?.img_url ? reviewedListing?.img_url : placeholder} alt='review' />
                <div className='review-user-info-container'>
                    <p><strong>Album </strong>{reviewedListing?.album}<strong> by</strong> {reviewedListing?.artist}</p>
                    <p><NavLink to={`/users/${reviewedListing?.seller?.id}/profile`}><strong>Sold by </strong>{reviewedListing?.seller?.username}</NavLink></p>

                </div>
            </div>
            <form onSubmit={handleReviewSubmit}>
                <div className='leave-rating-container'>
                    <h3 className='leave-rating-header'>
                        Rating
                    </h3>



                    <div className="leave-rating" id="rating" onChange={e => setRating(e.target.value)}>
                        <input
                            className="leave-star star-1"
                            type="radio"
                            name="stars"
                            id="star-1"
                            value="1"
                        />
                        <label className="leave-star star-1 star-label" htmlFor="star-1"></label>
                        <input
                            className="leave-star star-2"
                            type="radio"
                            name="stars"
                            id="star-2"
                            value="2"
                        />
                        <label className="leave-star star-2 star-label" htmlFor="star-2"></label>
                        <input
                            className="leave-star star-3"
                            type="radio"
                            name="stars"
                            id="star-3"
                            value="3"
                        />
                        <label className="leave-star star-3 star-label" htmlFor="star-3"></label>
                        <input
                            className="star star-4"
                            type="radio"
                            name="stars"
                            id="star-4"
                            value="4"
                        />
                        <label className="leave-star star-4 star-label" htmlFor="star-4"></label>
                        <input
                            className="star star-5"
                            type="radio"
                            name="stars"
                            id="star-5"
                            value="5"
                        />
                        <label className="leave-star star-5 star-label" htmlFor="star-5"></label>
                </div>




                </div>
                <div className='leave-headline-container'>
                    <h3 className='leave-headline-header'>
                        Add a headline
                    </h3>
                        <input
                            type='text'
                            placeholder='What is most important to know?'
                            onChange={handleHeadline}
                            value={headline}
                        />
                </div>
                <div>
                    <h3 className='leave-review-header'>
                        Text review
                    </h3>
                    <textarea
                        placeholder='Write a review...'
                        value={review}
                        onChange={handleReview}
                    >
                    </textarea>

                </div>
                <div className='leave-button-container'>
                    <button className='listing-button' id={`review-${reviewedListing?.id}`}>Submit Review</button>
                </div>
            </form>
            </div>
        </main>
    )
}

export default LeaveAReview;
