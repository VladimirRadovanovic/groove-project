import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './GetUsersOrders.css'
import { loadUserOrders } from '../../store/orders';


function GetUserOrders({ user }) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUserOrders())
    }, [])

    const orders = useSelector(state => state.orders)
    const ordersList = Object.values(orders)
    const sessionUserOrdersList = ordersList.filter(order => (
        order?.user_id === user?.id
    ))

    return (
        <>
        <h1 className='h1tag'>
            {user?.id}
        </h1>
        </>
    )
}

export default GetUserOrders;
