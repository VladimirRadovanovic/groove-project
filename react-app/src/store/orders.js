const ORDER_CHECKOUT = 'orders/ORDER_CHECKOUT'
const LOAD_ORDERS = 'orders/LOAD_ORDERS'
const REMOVE_ORDER = 'orders/REMOVE_ORDER'
const UPDATE_ORDER = 'orders/UPDATE_ORDER'

const editOrder = (order) => {
    return {
        type: UPDATE_ORDER,
        order
    }
}

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

const removeOrder = (id) => {
    return {
        type: REMOVE_ORDER,
        id
    }
}

export const updateOrder = (id, instructions) => async(dispatch) => {

    const response = await fetch(`/api/orders/${id}/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({instructions})
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(editOrder(data.order))
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


export const cancelOrder = (id) => async(dispatch) => {
    const response = await fetch(`/api/orders/${id}/remove`, {
        method: 'DELETE'
    })

    if(response.ok) {
        const data = await response.json()
        if (data.message === 'Deleted') {
            dispatch(removeOrder(id))
        }
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

    const response = await fetch('/api/orders/checkout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })


    if (response.ok) {
        const data = await response.json()

        dispatch(addOrder(data.order))
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

const orderReducer = (state = {}, action) => {
    let newState = {}
    switch(action.type) {
        case UPDATE_ORDER:
            newState = {...state, [action.order.id]: action.order}
            return newState
        case REMOVE_ORDER:
            newState = {...state}
            delete newState[action.id]
            return newState
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
