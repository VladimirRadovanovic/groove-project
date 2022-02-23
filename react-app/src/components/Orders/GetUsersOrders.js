import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './GetUsersOrders.css'
import { loadUserOrders } from '../../store/orders';
import { cancelOrder } from '../../store/orders';
import UpdateOrderForm from './UpdateOrderForm';
import CancelOrderModal from './CancelOrderModal';


function GetUserOrders({ user }) {
    const dispatch = useDispatch()
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [updateId, setUpdateId] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [instruction, setInstruction] = useState('')

    useEffect(() => {
        dispatch(loadUserOrders())
    }, [user, dispatch])

    const orders = useSelector(state => state.orders)
    const ordersList = Object.values(orders)
    const sessionUserOrdersList = ordersList.filter(order => (
        order?.user_id === user?.id
    ))



    const onCloseConfirm = () => {
        setShowConfirmModal(false)
    }

    const onOpenConfirm = (e) => {
        setShowConfirmModal(true)
        setDeleteId(e.target.id)
    }

    const onClose = () => {
        setShowUpdateModal(false)
    }
    const onOpen = (e) => {
        setShowUpdateModal(true)
        const id = Number(e.target.id.split('-')[1])
        setInstruction(orders[id]?.delivery_instructions)
        setUpdateId(id)
    }


    const handleCancelOrder = (e) => {
        const id = e.target.id.split('-')[1]
        // const orderId = Number(id)
        dispatch(cancelOrder(id))
        onCloseConfirm()
    }



    return (
        <section className='profile-orders-section-container'>
            <div className='profile-orders-container'>
                {sessionUserOrdersList?.length === 0 && (
                    <div className="none-available-container">
                        <p className="none-available-text">No orders made.</p>
                    </div>
                )
                }
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
                                <div className='item-delivered-label'>Order delivered <i className="fa-solid fa-check"></i></div>
                                :
                                <div>
                                    <p>
                                        <strong>Expected delivery: </strong> {new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2))?.toDateString()}
                                    </p>
                                    <p>
                                        <strong>Delivery instructions:</strong> {order?.delivery_instructions}

                                    </p>
                                </div>
                            }
                        </div>

                        {order?.created_at && new Date(new Date(order?.created_at)?.setDate(new Date(order?.created_at)?.getDate() + 2)) < new Date() ? null :
                            <div>
                                <button className='cancel-order-profile-button' id={`cancel-${order?.id}`} onClick={onOpenConfirm}>Cancel order</button>
                                <button className='update-order-profile-button' id={`order-${order?.id}`} onClick={onOpen}>Update delivery instructions</button>
                            </div>
                        }
                        {showUpdateModal && (
                            <UpdateOrderForm onClose={onClose} onOpen={onOpen} instructions={instruction} id={updateId} />
                        )}
                        {showConfirmModal && (
                            <CancelOrderModal onCloseConfirm={onCloseConfirm} handleCancelOrder={handleCancelOrder} id={deleteId} />
                        )}
                    </article>
                ))}
            </div>
        </section>
    )
}

export default GetUserOrders;
