const LOAD_ALL_LISTINGS = 'listings/LOAD_ALL_LiSTINGS'

const loadListings = (listings) => {
    return {
        type: LOAD_ALL_LISTINGS,
        listings
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
        case LOAD_ALL_LISTINGS:
            newState = {...action.listings}
            return newState
        default:
            return newState
    }
}

export default listingReducer;
