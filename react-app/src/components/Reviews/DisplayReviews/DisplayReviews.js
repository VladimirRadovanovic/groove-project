import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './DisplayReviews.css'
import { getListingReviews } from '../../../store/reviews';

function DisplayReviews( { listing }) {
    const dispatch = useDispatch()

    useEffect(() => {
        if(listing) {

            dispatch(getListingReviews(listing?.id))
        }
    }, [])

    const reviews = useSelector(state => state.reviews)
    const reviewsList = Object.values(reviews)


    return (
        <section className='display-reviews-section'>
            <h2>Customer reviews</h2>
            <NavLink to={`/records/${listing?.id}/review`}>Leave a Review</NavLink>
            <div>

            </div>
        </section>
    )

}

export default DisplayReviews;
