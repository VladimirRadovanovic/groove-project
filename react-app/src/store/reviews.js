const ADD_REVIEW = 'reviews/ADD_REVIEW'

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
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
        console.log(data.review, 'review data if passed')
        // dispatch(addReview(data.review))
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
        default:
            return newState
    }
}

export default reviewReducer;
