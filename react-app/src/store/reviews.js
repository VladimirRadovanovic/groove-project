import { loadListings } from "./listings"

const ADD_REVIEW = 'reviews/ADD_REVIEW'
const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'



const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}


export const getListingReviews = (id) => async(dispatch) => {
    const response = await fetch(`/api/reviews/listings/${id}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(loadReviews(data.reviews))

        return null
    }
}


export const makeReview = (review) => async(dispatch) => {

    const response = await fetch('/api/reviews/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addReview(data.review))

        return null
    }
    else if (response.status < 500) {
        const data = await response.json();

        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}


const reviewReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case ADD_REVIEW:
            newState = {...state, [action.review.id]: action.review}
            return newState
        case LOAD_REVIEWS:
            newState = {...state, ...action.reviews}
            return newState
        default:
            return state
    }
}

export default reviewReducer;
