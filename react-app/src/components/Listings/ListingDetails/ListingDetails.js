import { useParams, useHistory, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'



import placeholder from '../../../images/vinyl.jpg'
import { getAllListings } from '../../../store/listings'
import './ListingDetails.css'
import EditListing from '../EditListing/EditListing'
// import RemoveListing from '../RemoveListing/RemoveListing'
import ConfirmRemoveListing from '../RemoveListing/RemoveListing'
import { deleteListing } from '../../../store/listings'
import DisplayReviews from '../../Reviews/DisplayReviews/DisplayReviews'
import GoBackButton from '../../Utils/GoBackButton'
// import { getListingReviews } from '../../../store/reviews'a
import { getAllReviews } from '../../../store/reviews'



function ListingDetails({ user, numItemSetter }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [listingIdNum, setListingIdNum] = useState('')

    const { recordId } = useParams()
    const listingId = Number(recordId)
    console.log(listingId, 'from use params')
    useEffect(() => {

             dispatch(getAllListings())
            //  dispatch(getListingReviews(listingId))
             dispatch(getAllReviews())

    }, [recordId, dispatch])


    const listings = useSelector(state => state.listings)
    const listing = listings[listingId]

    const reviews = useSelector(state => state.reviews)
    const reviewsList = Object.values(reviews)
    const listingReviewsList = reviewsList.filter(review => (
        review.listing_id === listingId
    ))
    let totalRating = 0;
    listingReviewsList.forEach(review => (
        totalRating += review.rating
    ))

    let avgRating = Number.isNaN(parseFloat((totalRating / listingReviewsList.length).toFixed(2)))
    if(avgRating) {
        avgRating = 'This record currently has no reviews.'
    } else {
        avgRating = parseFloat((totalRating / listingReviewsList.length).toFixed(2))
    }
    let percentRating = (avgRating / 5 * 100).toFixed(2)

    if(listingReviewsList.length === 0) percentRating = 0
    // if (avgRating === NaN) avgRating = 0
    console.log(typeof(avgRating), 'avrage rating')
    console.log(avgRating, 'rating acr')



    const handleDelete = async(e) => {
        const id = Number(e.target.id)
        const data = await dispatch(deleteListing(id))
        if (data === 'Deleted') {

            history.push(`/user/profile`)
        }

    }

    const onOpen = (e) => {
        setShowModal(true)
        setListingIdNum(Number(e.target.id))
    }

    const onClose = () => {
        setShowModal(false)
    }

    const handleAddToCart = (e) => {
        const id = Number(e.target.id)
        const cartListing = listings[id]
        localStorage.setItem(id, JSON.stringify(cartListing))
        let numItems = ''
        if(localStorage.getItem('searched')) {
             numItems = Object.values(localStorage).length - 1
        } else {
            numItems = Object.values(localStorage).length
        }

        numItemSetter(numItems)
        history.push('/cart')
    }

    return (
        <main className='details-main' >
             <GoBackButton />
             <h2 className='details-headline'>Listing details</h2>
             <div className='sold-by-container'>
                 <h3>Sold by</h3>
                 <div>
                    <img className='sold-by-img' src={listing?.seller?.profile_img_url ? listing?.seller?.profile_img_url : placeholder} alt='sold' />
                    <p id='img-heading' className='sold-by-paragraph'><NavLink className='link-to-profile-in-details' to={`/users/${listing?.seller?.id}/profile`}>{listing?.seller?.username}</NavLink> </p>
                 </div>
                </div>
                <div className='record-details-container'>
                <h3>Record details</h3>

                </div>
            <div className='details-main-container'>

            <section className='details-img-container'>
                <img  className='details-img' src={listing?.img_url ? listing.img_url : placeholder} alt='profile' />
            </section>
            <section className='details-data-container'>
            <div className='album-and-artist'>
            {listing?.album} by {listing?.artist}
            </div>
                <div className='star-avg-container'>
                <div  className='avg-rating'>
                    <div style={{width:`${percentRating}%`}} className='avg-star-container'>
                        <div className='min-width-content'>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    </div>
                    </div>
                </div>
                        <span className='avg-num'>{typeof(avgRating) === 'number' ?
                        (<span>{avgRating} out of 5 | <NavLink to='#customer-reviews'>{listingReviewsList?.length === 1 ? `${listingReviewsList?.length} review` : `${listingReviewsList?.length} reviews` } </NavLink></span>)
                        :
                        (<span>{avgRating } <NavLink to={`/records/${listing?.id}/review`}>Be the first one to review it.</NavLink></span>)}
                        </span>
                        </div>
                <div className='record-data-container'>
                <div className='details-info-container'>
                    <p><strong>Listed on:</strong> {listing?.created_at && new Date(listing?.created_at).toDateString()}</p>
                    <p><strong>Genre:</strong> {listing?.genre}</p>
                    <p><strong>Condition:</strong> {listing?.condition}</p>
                    <p><strong>Price:</strong> ${listing?.price.toFixed(2)}</p>
                    <p><strong>Available copies:</strong> {listing?.num_copies_available}</p>
                    <p><strong>Description:</strong> {listing?.description}</p>
                </div>
                {listing?.seller_id === user?.id ?
                    <div className='edit-remove-profile-container'>
                        <EditListing listing={listing} />
                        {/* <ConfirmRemoveListing listing={listing} handleDelete={handleDelete} /> */}
                        <button className='remove-listing-profile' id={listing?.id} onClick={onOpen} >Remove listing</button>
                    </div>
                    :
                    // <AddToCart listing={listing} />
                    <button onClick={handleAddToCart} id={listing?.id} className='cart-button details-cart-button'>Add to Cart</button>
                }
                {showModal && (
                    <ConfirmRemoveListing id={listingIdNum} handleDelete={handleDelete} onClose={onClose} />

                )}
                </div>
            </section>
            </div>
            <DisplayReviews listing={listing} reviewsList={listingReviewsList} />
        </main>
    )
}

export default ListingDetails;
