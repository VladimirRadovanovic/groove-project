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
import { getListingReviews } from '../../../store/reviews'



function ListingDetails({ user, numItemSetter }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showModal, setShowModal] = useState(false)
    const [listingIdNum, setListingIdNum] = useState('')

    const { recordId } = useParams()
    const listingId = Number(recordId)
    useEffect(() => {

             dispatch(getAllListings())
             dispatch(getListingReviews(listingId))

    }, [recordId, dispatch])


    const listings = useSelector(state => state.listings)
    const listing = listings[listingId]

    const reviews = useSelector(state => state.reviews)
    const reviewsList = Object.values(reviews)
    let totalRating = 0;
    reviewsList.forEach(review => (
        totalRating += review.rating
    ))

    const avgRating = totalRating / reviewsList.length

    let percentRating = (avgRating / 5 * 100).toFixed(0)

    if(reviewsList.length === 0) percentRating = 0

    console.log(percentRating, 'percent rating')

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
        const numItems = Object.values(localStorage).length

        numItemSetter(numItems)
        history.push('/cart')
    }

    return (
        <main >
            <div className='details-main-container'>
            <section className='details-img-container'>
                <img className='details-img' src={listing?.img_url ? listing.img_url : placeholder} alt='profile' />
            </section>
            <div className='details-back'>
                <GoBackButton />

            </div>
            <section className='details-data-container'>
                <div className='sold-by-container'>
                    <p className='sold-by-paragraph'><strong>Sold by: </strong><NavLink className='link-to-profile-in-details' to={`/users/${listing?.seller?.id}/profile`}>{listing?.seller?.username}</NavLink> </p>
                    <img className='sold-by-img' src={listing?.seller?.profile_img_url ? listing?.seller?.profile_img_url : placeholder} alt='sold' />
                </div>
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
                <div className='details-info-container'>
                    <p><strong>Posted on:</strong> {listing?.created_at && new Date(listing?.created_at).toDateString()}</p>
                    <p><strong>Album:</strong> {listing?.album}</p>
                    <p><strong>Artist:</strong> {listing?.artist}</p>
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
            </section>
            </div>
            <DisplayReviews listing={listing} reviewsList={reviewsList} />
        </main>
    )
}

export default ListingDetails;
