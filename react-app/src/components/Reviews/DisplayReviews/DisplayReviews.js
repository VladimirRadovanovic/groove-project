import { NavLink } from 'react-router-dom';

import './DisplayReviews.css'

function DisplayReviews( { listing }) {

    return (
        <section className='display-reviews-section'>
            <h2>Customer reviews</h2>
            <NavLink to={`/records/${listing?.id}/review`}>Leave a Review</NavLink>
        </section>
    )

}

export default DisplayReviews;
