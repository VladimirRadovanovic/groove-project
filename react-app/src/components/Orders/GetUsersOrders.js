import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

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
        <section className='profile-orders-section-container'>
            <div className='profile-orders-container'>
                {sessionUserOrdersList?.map(order => (
                    <article className='order-article-container' key={order?.id}>
                        {/* {order?.created_at} */}
                        <div className='left-container'>
                            {order?.ordered_items?.map((orderItem, i) => (
                                <div className='article-order-data-1' key={orderItem?.id}>
                                    {/* {orderItem?.created_at && new Date(orderItem?.created_at)?.toDateString()} */}
                                    {/* {orderItem?.created_at && new Date(new Date(orderItem?.created_at)?.setDate(new Date(orderItem?.created_at)?.getDate() + 2))?.toDateString()} */}
                                    {/* {orderItem?.created_at && new Date(new Date(orderItem?.created_at)?.setDate(new Date(orderItem?.created_at)?.getDate() + 2)) < new Date() ? 'Item delivered' :
                        <div>
                            Expected delivery {new Date(new Date(orderItem?.created_at)?.setDate(new Date(orderItem?.created_at)?.getDate() + 2))?.toDateString()}
                        </div>

                        } */}         <p><strong><NavLink className='order-link-detail' to={`/records/${orderItem?.item.id}/details`}>Order item {i + 1}</NavLink></strong></p>
                                    <p>
                                        <strong>Album:</strong> {orderItem?.item?.album}
                                    </p>
                                    <p>
                                        <strong>Artist:</strong> {orderItem?.item?.artist}
                                    </p>
                                    <p>
                                        <strong>Copies ordered:</strong> {orderItem?.num_items_ordered}
                                    </p>
                                    <p>
                                        <strong>Record price:</strong> ${orderItem?.item?.price?.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className='middle-container'>

                            <div>
                                <strong>Order total:</strong> ${order?.total_cost.toFixed(2)}
                            </div>
                            <div>
                                <strong>Ordered on: </strong> {order?.created_at && new Date(order?.created_at)?.toDateString()}
                            </div>
                            {order?.created_at && new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2)) < new Date() ?
                                <div className='item-delivered-label'>Order delivered</div>
                                :
                                <div>
                                    <strong>Expected delivery: </strong> {new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2))?.toDateString()}
                                </div>
                            }
                        </div>

                        {order?.created_at && new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2)) < new Date() ? null :

                            <button className='cancel-order-profile-button' id={`cancel-${order?.id}`} onClick={handleCancelOrder}>Cancel order</button>
                        }
                    </article>
                ))}
            </div>
        </section>
    )
}

export default GetUserOrders;
