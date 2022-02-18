import { NavLink, useHistory } from "react-router-dom"
import { useState } from "react"


import placeholder from '../../../images/vinyl.jpg'


function DisplayListings({ listingsList, numItemSetter }) {

    const history = useHistory()

    const handleAddToCart = (e) => {
        const id = Number(e.target.id)

        const cartListing = listingsList.filter(listing => (
            listing.id === id
        ))
        localStorage.setItem(id, JSON.stringify(cartListing[0]))
        const numItems = Object.values(localStorage).length

        numItemSetter(numItems)
        history.push('/cart')

    }
    return (
        <div className='splash-article-container'>
            {listingsList?.map(listing => (
                <article className='section-3-article article' key={listing?.id}>
                    <div className='article-side article-front'>
                        <div className='section-3-img-container article-img-container'>
                            <img src={listing?.images?.img_url ? listing?.images?.img_url : placeholder}
                                className='section-3-img article-img' alt='record' />
                        </div>
                        <div className='article-front-text-container'>
                            <p className='album-text'>
                                {listing?.album}
                            </p>
                            <p className='artist-text'>
                                {listing?.artist}
                            </p>
                            <p className='price-text'>
                                ${listing?.price.toFixed(2)}
                            </p>
                        </div>

                    </div>
                    <div className='article-side article-back'>
                        <div className='article-back-text-container'>
                            <h3 className='article-back-heading'>Description</h3>
                            <p className='article-back-text'>
                                {listing?.description}
                            </p>
                        </div>
                        <div className='article-button-box'>

                                <button onClick={handleAddToCart} id={listing?.id} className='cart-button'>Add to Cart</button>


                            {/* <AddToCart listing={listing} /> */}
                            <NavLink to={`/records/${listing?.id}/details`} className='details-link'>View Details</NavLink>
                        </div>
                    </div>
                </article>
            ))}

        </div>
    )
}

export default DisplayListings
