import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getAllListings } from '../../../store/listings'
import './ListingDetails.css'
import { useEffect } from 'react'

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
        <>
        <h1>hello {listing?.id}</h1>
        </>
    )
}

export default ListingDetails;
