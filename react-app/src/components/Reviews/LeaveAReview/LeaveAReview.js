import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


import './LeaveAReview.css'
import { getAllListings } from '../../../store/listings';
import placeholder from '../../../images/vinyl.jpg'
import { makeReview, getAllReviews, changeReview} from '../../../store/reviews';
import GoBackButton from '../../Utils/GoBackButton';


function LeaveAReview({ user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { reviewId } = useParams()

    useEffect(() => {
        dispatch(getAllReviews())
    }, [reviewId, dispatch])

    const reviews = useSelector(state => state.reviews)
    let editReview;
    if(reviewId) {
        editReview = reviews[Number(reviewId)]
    }


    const [review, setReview] = useState(editReview?.review || '')
    const [headline, setHeadline] = useState(editReview?.headline || '')
    const [rating, setRating] = useState(editReview?.rating || '')
    const [fillStar1, setFillStar1] = useState('')
    const [fillStar2, setFillStar2] = useState('')
    const [fillStar3, setFillStar3] = useState('')
    const [fillStar4, setFillStar4] = useState('')
    const [fillStar5, setFillStar5] = useState('')
    const [errors, setErrors] = useState([])

    if(fillStar1 === '' && fillStar2 === '' && fillStar3 === '' && fillStar4 === '' && fillStar5 === '') {

    if(editReview?.rating === 1 && !fillStar1) {

        setFillStar1('fill')
    } else if (editReview?.rating === 1 && fillStar2 === 'fill') {
        setFillStar2('')
        setFillStar3('')
        setFillStar4('')
        setFillStar5('')
    }

    if(editReview?.rating === 2 && !fillStar2) {
        setFillStar1('fill')
        setFillStar2('fill')
    } else if(editReview?.rating === 2 && fillStar3 === 'fill') {
        setFillStar3('')
        setFillStar4('')
        setFillStar5('')
    }

    if(editReview?.rating === 3 && !fillStar3) {
        setFillStar1('fill')
        setFillStar2('fill')
        setFillStar3('fill')
    } else if(editReview?.rating === 3 && fillStar4 === 'fill') {
        setFillStar4('')
        setFillStar5('')
    }

    if(editReview?.rating === 4 && !fillStar4) {
        setFillStar1('fill')
        setFillStar2('fill')
        setFillStar3('fill')
        setFillStar4('fill')
    } else if (editReview?.rating === 4 && fillStar5 === 'fill') {
        setFillStar5('')
    }

    if(editReview?.rating === 5 && !fillStar5) {
        setFillStar1('fill')
        setFillStar2('fill')
        setFillStar3('fill')
        setFillStar4('fill')
        setFillStar5('fill')
    }
}


    useEffect(() => {
        dispatch(getAllListings())
    }, [dispatch])

    const { recordId } = useParams()
    const listingId = Number(recordId)

    const listings = useSelector(state => state.listings)
    let reviewedListing = listings[listingId]

    if (!reviewedListing) {
        reviewedListing = listings[editReview?.listing_id]


    }

    const handleReview = (e) => {
        setReview(e.target.value)
    }

    const handleHeadline = (e) => {
        setHeadline(e.target.value)
    }


    const handleReviewSubmit = async(e) => {
        e.preventDefault()

        if(editReview) {

            const payload = {
                reviewId,
                headline,
                review,
                rating
            }
            const data = await dispatch(changeReview(payload))
            if(data) {
                setErrors(data)

            } else {
                history.push(`/records/${editReview?.listing_id}/details`)
            }

        } else {
            const listing_id = Number(e.target.id.split('-')[1])

            const payload = {
                listing_id,
                headline,
                review,
                rating
            }
            const data = await dispatch(makeReview(payload))
            if(data) {
                setErrors(data)

            } else {
                history.push(`/records/${listingId}/details`)
            }

        }

    }

    const handleSetRating = (e) => {
        let value = Number(e.target.value)
        setRating(value)

        if(value === 1 && !fillStar1) {

            setFillStar1('fill')
        } else if (value === 1 && fillStar2 === 'fill') {
            setFillStar2('')
            setFillStar3('')
            setFillStar4('')
            setFillStar5('')
        }

        if(value === 2 && !fillStar2) {
            setFillStar1('fill')
            setFillStar2('fill')
        } else if(value === 2 && fillStar3 === 'fill') {
            setFillStar3('')
            setFillStar4('')
            setFillStar5('')
        }

        if(value === 3 && !fillStar3) {
            setFillStar1('fill')
            setFillStar2('fill')
            setFillStar3('fill')
        } else if(value === 3 && fillStar4 === 'fill') {
            setFillStar4('')
            setFillStar5('')
        }

        if(value === 4 && !fillStar4) {
            setFillStar1('fill')
            setFillStar2('fill')
            setFillStar3('fill')
            setFillStar4('fill')
        } else if (value === 4 && fillStar5 === 'fill') {
            setFillStar5('')
        }

        if(value === 5 && !fillStar5) {
            setFillStar1('fill')
            setFillStar2('fill')
            setFillStar3('fill')
            setFillStar4('fill')
            setFillStar5('fill')
        }
    }

    // const handleMouseOver = (e) => {
    //     const value = Number(e.target.id)
    //     console.log(value, 'mouser over id')
    //     setRating(value)
    //     if(value === 1 && !fillStar1) {
    //         console.log('in the ifffffffffffff')
    //         setFillStar1('fill')
    //     } else if (value === 1 && fillStar2 === 'fill') {
    //         setFillStar2('')
    //         setFillStar3('')
    //         setFillStar4('')
    //         setFillStar5('')
    //     }

    //     if(value === 2 && !fillStar2) {
    //         setFillStar1('fill')
    //         setFillStar2('fill')
    //     } else if(value === 2 && fillStar3 === 'fill') {
    //         setFillStar3('')
    //         setFillStar4('')
    //         setFillStar5('')
    //     }

    //     if(value === 3 && !fillStar3) {
    //         setFillStar1('fill')
    //         setFillStar2('fill')
    //         setFillStar3('fill')
    //     } else if(value === 3 && fillStar4 === 'fill') {
    //         setFillStar4('')
    //         setFillStar5('')
    //     }

    //     if(value === 4 && !fillStar4) {
    //         setFillStar1('fill')
    //         setFillStar2('fill')
    //         setFillStar3('fill')
    //         setFillStar4('fill')
    //     } else if (value === 4 && fillStar5 === 'fill') {
    //         setFillStar5('')
    //     }

    //     if(value === 5 && !fillStar5) {
    //         setFillStar1('fill')
    //         setFillStar2('fill')
    //         setFillStar3('fill')
    //         setFillStar4('fill')
    //         setFillStar5('fill')
    //     }
    // }

    return (
        <main className='leave-review-main'>
            <GoBackButton />
            <div className='leave-review-container'>
            <ul className={errors?.length === 0 ? 'leave-errors-list-empty' : 'leave-errors-list'}>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <h2 className='leave-review-heading'>
               {editReview ? 'Edit review' : 'Create review'}
            </h2>
            <div className='leave-review-info-container'>
                <img className='leave-review-img' src={reviewedListing?.img_url ? reviewedListing?.img_url : placeholder} alt='review' />
                <div className='review-user-info-container'>
                    <p><strong>Album </strong>{reviewedListing?.album}<strong> by</strong> {reviewedListing?.artist}</p>
                    <p><strong>Sold by </strong><NavLink className='sold-by-review' to={`/users/${reviewedListing?.seller?.id}/profile`}>{reviewedListing?.seller?.username}</NavLink></p>
                        {/* {reviewedListing?.id} */}
                </div>
            </div>
            <form id={`form-${reviewedListing?.id}`} onSubmit={handleReviewSubmit}>
                <div className='leave-rating-container'>
                    <h3 className='leave-rating-header'>
                        Rating
                    </h3>



                    <div className="leave-rating" id="rating" onChange={handleSetRating}>
                    <label className="leave-star star-1 star-label" htmlFor="star-1">
                    <i id='1' className={`fa-solid fa-star star-1 ${fillStar1}`}>

                        <input
                            className="leave-star star-1"
                            type="radio"
                            name="stars"
                            id="star-1"
                            value={1}
                        />
                        </i>
                       </label>
                       <label className="leave-star star-2 star-label" htmlFor="star-2">
                        <i id='2' className={`fa-solid fa-star star-2 ${fillStar2}`}>
                        <input
                            className="leave-star star-2"
                            type="radio"
                            name="stars"
                            id="star-2"
                            value={2}
                        />
                        </i>
                       </label>
                       <label className="leave-star star-3 star-label" htmlFor="star-3">
                        <i id='3' className={`fa-solid fa-star star-3 ${fillStar3}`}>
                        <input
                            className="leave-star star-3"
                            type="radio"
                            name="stars"
                            id="star-3"
                            value={3}
                        />
                        </i>
                        </label>
                        <label className="leave-star star-4 star-label" htmlFor="star-4">
                        <i id='4' className={`fa-solid fa-star star-4 ${fillStar4}`}>
                        <input
                            className="star star-4"
                            type="radio"
                            name="stars"
                            id="star-4"
                            value={4}
                        />
                        </i>
                        </label>
                        <label className="leave-star star-5 star-label" htmlFor="star-5">
                        <i id='5' className={`fa-solid fa-star star-5 ${fillStar5}`}>
                        <input
                            className="star star-5"
                            type="radio"
                            name="stars"
                            id="star-5"
                            value={5}
                        />
                        </i>
                        </label>
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
