import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './GetUsersOrders.css'
import { loadUserOrders } from '../../store/orders';


function GetUserOrders({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUserOrders())
    }, [user, dispatch])

    const orders = useSelector(state => state.orders)
    const ordersList = Object.values(orders)
    const sessionUserOrdersList = ordersList.filter(order => (
        order?.user_id === user?.id
    ))

    console.log(sessionUserOrdersList[0]?.ordered_items, 'session rders list*********')

    return (
        <>
        <h1 className='h1tag'>
        </h1>
        {sessionUserOrdersList?.map(order => (
            <div className='order-container' key={order?.id}>
                {user?.id}
                {order?.created_at}
                {order?.ordered_items?.map(orderItem => (
                    <div key={orderItem?.id}>
                        {orderItem?.item?.album}
                        {orderItem?.item?.artist}
                        {orderItem?.item?.num_items_ordered}
                        ${orderItem?.item?.price?.toFixed(2)}
                    </div>
                ))}

                    <button>Cancel order</button>
            </div>
    ))}
        </>
    )
}

export default GetUserOrders;
