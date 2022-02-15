const LOAD_ALL_LISTINGS = 'listings/LOAD_ALL_LiSTINGS'
const CREATE_LISTING = 'listings/CREATE_LISTING'

const loadListings = (listings) => {
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

export const createListing = (listing) => async(dispatch) => {
    const response = await fetch('/api/listings/create', {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(listing)
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
    // else {
    //     return ['An error occurred. Please try again.']
    // }
}


const listingReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case CREATE_LISTING:
            newState = {...state, [action.listing.id]: action.listing}
            return newState
        case LOAD_ALL_LISTINGS:
            newState = {...action.listings}
            return newState
        default:
            return newState
    }
}

export default listingReducer;
