import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './DisplayReviews.css'
import { getAllReviews } from '../../../store/reviews';

function DisplayReviews( { listing }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllReviews())
    }, [])

    return (
        <section className='display-reviews-section'>
            <h2>Customer reviews</h2>
            <NavLink to={`/records/${listing?.id}/review`}>Leave a Review</NavLink>
        </section>
    )

}

export default DisplayReviews;
