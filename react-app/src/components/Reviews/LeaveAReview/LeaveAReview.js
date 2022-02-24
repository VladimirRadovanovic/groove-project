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
        <main>
            {/* <ul>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul> */}
            <h2>
                Crate review
            </h2>
            <div>
                <img className='review-img' src={reviewedListing?.img_url ? reviewedListing?.img_url : placeholder} alt='review' />
                <p>{reviewedListing?.album} by {reviewedListing?.artist}</p>
                <p><NavLink to={`/users/${reviewedListing?.seller?.id}/profile`}>{reviewedListing?.seller?.username}</NavLink></p>
            </div>
            <form onSubmit={handleReviewSubmit}>
                <h3>
                    Rating
                </h3>
                <div>
                    <h3>
                        Add a headline
                        <input
                            type='text'
                            placeholder='What is most important to know?'
                            onChange={handleHeadline}
                            value={headline}
                        />
                    </h3>
                </div>
                <div>
                    <h3>
                        Text review
                    </h3>
                    <textarea
                        placeholder='Write a review...'
                        value={review}
                        onChange={handleReview}
                    >
                    </textarea>

                </div>
                <button id={`review-${reviewedListing?.id}`}>Submit Review</button>
            </form>
        </main>
    )
}

export default LeaveAReview;
