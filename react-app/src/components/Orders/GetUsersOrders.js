import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './GetUsersOrders.css'
import { loadUserOrders } from '../../store/orders';
import { cancelOrder } from '../../store/orders';


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

    const handleCancelOrder = (e) => {
        const id = e.target.id.split('-')[1]
        const orderId = Number(id)
        dispatch(cancelOrder(id))
    }
    const date = new Date();
    console.log(new Date() < new Date(date.setDate(date.getDate() + 2)), 'datedate********')
    // console.log(sessionUserOrdersList[0]?.ordered_items, 'session rders list*********')

    return (
        <>
            <h1 className='h1tag'>
            </h1>
            {sessionUserOrdersList?.map(order => (
                <div className='order-container' key={order?.id}>
                    {/* {order?.created_at} */}
                    {order?.ordered_items?.map(orderItem => (
                        <div key={orderItem?.id}>
                            {/* {orderItem?.created_at && new Date(orderItem?.created_at)?.toDateString()} */}
                            {/* {orderItem?.created_at && new Date(new Date(orderItem?.created_at)?.setDate(new Date(orderItem?.created_at)?.getDate() + 2))?.toDateString()} */}
                            {/* {orderItem?.created_at && new Date(new Date(orderItem?.created_at)?.setDate(new Date(orderItem?.created_at)?.getDate() + 2)) < new Date() ? 'Item delivered' :
                        <div>
                            Expected delivery {new Date(new Date(orderItem?.created_at)?.setDate(new Date(orderItem?.created_at)?.getDate() + 2))?.toDateString()}
                        </div>
                        } */}
                            {orderItem?.item?.album}
                            {orderItem?.item?.artist}
                            {orderItem?.item?.num_items_ordered}
                            ${orderItem?.item?.price?.toFixed(2)}
                        </div>
                    ))}
                    <div>
                        Ordered on {order?.created_at && new Date(order?.created_at)?.toDateString()}
                    </div>
                    {order?.created_at && new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2)) < new Date() ? 'Item delivered' :
                        <div>
                            Expected delivery {new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2))?.toDateString()}
                        </div>
                    }

                    <button id={`cancel-${order?.id}`} onClick={handleCancelOrder}>Cancel order</button>
                </div>
            ))}
        </>
    )
}

export default GetUserOrders;
