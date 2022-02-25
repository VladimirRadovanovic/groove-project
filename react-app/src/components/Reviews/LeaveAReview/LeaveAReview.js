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
    const [errors, setErrors] = useState([])
    console.log(headline, 'headline***************')

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
