const ORDER_CHECKOUT = 'orders/ORDER_CHECKOUT'
const LOAD_ORDERS = 'orders/LOAD_ORDERS'

const addOrder = (order) => {
    return {
        type: ORDER_CHECKOUT,
        order
    }
}

const loadOrders = (orders) => {
    return {
        type: LOAD_ORDERS,
        orders
    }
}

export const loadUserOrders = () => async(dispatch) => {
    const response = await fetch('/api/orders/all')
    if(response.ok) {
        const data = await response.json()
        dispatch(loadOrders(data.orders))
        return null
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

    // const data = await response.json()
    // console.log(data.errors, 'response****')
    if (response.ok) {
        const data = await response.json()
        // console.log(data.order, 'order data')
        dispatch(addOrder(data.order))
        return null
    }
    else if (response.status < 500) {
        const data = await response.json();
        console.log(data.errors, 'presed error data')
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

const orderReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case LOAD_ORDERS:
            newState = {...state, ...action.orders}
            return newState
        case ORDER_CHECKOUT:
            newState = {...state, [action.order.id]: action.order}
            return newState
        default:
            return state
    }
}

export default orderReducer;
