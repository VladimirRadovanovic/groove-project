import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import placeholder from '../../../images/vinyl.jpg'
import { getAllListings } from '../../../store/listings'
import './ListingDetails.css'


function ListingDetails({ user }) {
    const dispatch = useDispatch()
    const {recordId} = useParams()
    const listingId = Number(recordId)
    useEffect(() => {
        dispatch(getAllListings())
    }, [recordId])

    const listings = useSelector(state => state.listings)
    const listing = listings[listingId]

    return (
        <main className='details-main-container'>
            <section className='details-img-container'>
                <img className='details-img' src={placeholder} />
            </section>
        <h1>hello {listing?.id}</h1>
        <div className='sold-by-container'>
            <p><strong>Sold by:</strong> {listing?.seller?.username}</p>
            <img className='sold-by-img' src={listing?.seller?.profile_img_url ? listing?.seller?.profile_img_url : placeholder} />
            <p><strong>Posted on:</strong> {listing?.created_at && new Date(listing?.created_at).toDateString()}</p>
        </div>
        <p><strong>Album:</strong> {listing?.album}</p>
        <p><strong>Artist:</strong> {listing?.artist}</p>
        <p><strong>Genre:</strong> {listing?.genre}</p>
        <p><strong>Condition:</strong> {listing?.condition}</p>
        <p><strong>Price:</strong> {listing?.price}</p>
        <p><strong>Available copies:</strong> {listing?.num_copies_available}</p>
        </main>
    )
}

export default ListingDetails;
