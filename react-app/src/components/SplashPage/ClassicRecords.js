import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GetAllListings from '../Listings/GetListings/GetAllListings'
import './ClassicRecords.css'
import { getAllListings } from '../../store/listings';
import placeholder from '../../images/vinyl.jpg'


function GetClassicRecords({ user }) {
    const dispatch = useDispatch()
    const url = window.location.href

    

    return (
        <section className='splash-section-3'>
            <GetAllListings user={user} />
        </section>
    )
}

export default GetClassicRecords;
