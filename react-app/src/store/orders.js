const ORDER_CHECKOUT = 'orders/ORDER_CHECKOUT'

const addOrder = (order) => {
    return {
        type: ORDER_CHECKOUT,
        order
    }
}


export const checkout = (payload) => async(dispatch) => {
    console.log(payload, 'payload******')
    const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    const data = await response.json()
    console.log(data.order, 'response****')
    // if (response.ok) {
    //     const data = await response.json()
    //     console.log(data.order, 'order data')
    //     dispatch(checkout(data.order))
    //     return null
    // } else if (response.status < 500) {
    //     const data = await response.json();
    //     if (data.errors) {
    //         return data.errors;
    //     }
    // } else {
    //     return ['An error occurred. Please try again.']
    // }
}

const orderReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case ORDER_CHECKOUT:
            newState = {...state, [action.order.id]: action.order}
            return newState
        default:
            return state
    }
}

export default orderReducer;
