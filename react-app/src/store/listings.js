const LOAD_ALL_LISTINGS = 'listings/LOAD_ALL_LiSTINGS'
const CREATE_LISTING = 'listings/CREATE_LISTING'
const REMOVE_LISTING = 'listings/REMOVE_LISTING'
const UPDATE_LISTING = 'listings/UPDATE_LISTING'

export const loadListings = (listings) => {
    return {
        type: LOAD_ALL_LISTINGS,
        listings
    }
}

const addListing = (listing) => {
    return {
        type: CREATE_LISTING,
        listing
    }
}

const removeListing = (id) => {
    return {
        type: REMOVE_LISTING,
        id
    }
}

const updateListing = (listing) => {
    return {
        type: UPDATE_LISTING,
        listing
    }
}


export const editListing = (listing, id) => async(dispatch) => {

    const response = await fetch(`/api/listings/${id}/edit`, {
        method: 'PATCH',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(listing)
        body: listing
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateListing(data.listing))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}


export const deleteListing = (id) => async(dispatch) => {
    const response = await fetch(`/api/listings/${id}/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(id)
    })
    if(response.ok) {

        const data = await response.json()
        if (data.message === 'Deleted') {
            dispatch(removeListing(id))
            return 'Deleted'
        }
    }
}


export const createListing = (listing) => async(dispatch) => {

    const response = await fetch('/api/listings/create', {
        method: 'POST',
        body: listing
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addListing(data.listing))
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const getAllListings = () => async(dispatch) => {
    const response = await fetch('/api/listings/all')
    if(response.ok) {
        const data = await response.json()
        dispatch(loadListings(data.listings))
        return null
    }
}


const listingReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case UPDATE_LISTING:
            newState = {...state, [action.listing.id]: action.listing}
            return newState
        case REMOVE_LISTING:
            newState = {...state}
            delete newState[action.id]
            return newState
        case CREATE_LISTING:
            newState = {...state, [action.listing.id]: action.listing}
            return newState
        case LOAD_ALL_LISTINGS:
            newState = {...state, ...action.listings}
            return newState
        default:
            return state
    }
}

export default listingReducer;
