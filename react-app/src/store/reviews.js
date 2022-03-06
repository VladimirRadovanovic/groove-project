import DeleteReview from "../components/Reviews/DeleteReview/DeleteReview"
import { loadListings } from "./listings"

const ADD_REVIEW = 'reviews/ADD_REVIEW'
const LOAD_LISTING_REVIEWS = 'reviews/LOAD_LISTING_REVIEWS'
const LOAD_ALL_REVIEWS = 'reviews/LOAD_ALL_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEWS'
const EDIT_REVIEW = 'reviews/EDIT_REVIEW'

const updateReview = (review) => {
    return {
        type: EDIT_REVIEW,
        review
    }
}

const loadAllReviews = (reviews) => {
    return {
        type: LOAD_ALL_REVIEWS,
        reviews
    }
}


const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

const loadReviews = (reviews) => {
    return {
        type: LOAD_LISTING_REVIEWS,
        reviews
    }
}

const removeReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}


export const changeReview = (payload) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${payload.reviewId}/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(updateReview(data.review))

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


export const deleteReview = (id) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${id}/delete`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const data = await response.json()
        if (data.message === 'Deleted') {
            dispatch(removeReview(id))
            return 'Deleted'
        }
    }
}


export const getAllReviews = () => async(dispatch) => {
    const response = await fetch ('/api/reviews/all')
    if(response.ok) {
        const data= await response.json()
        dispatch(loadAllReviews(data.reviews))
        return null
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
        case EDIT_REVIEW:
            newState = {...state, [action.review.id]: action.review}
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.id]
            return newState
        case ADD_REVIEW:
            newState = {...state, [action.review.id]: action.review}
            return newState
        case LOAD_ALL_REVIEWS:
            newState = {...state, ...action.reviews}
        case LOAD_LISTING_REVIEWS:
            newState = {...action.reviews}
            return newState
        default:
            return state
    }
}

export default reviewReducer;
