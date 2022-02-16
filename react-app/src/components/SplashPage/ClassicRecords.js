

import GetAllListings from '../Listings/GetListings/GetAllListings'
import './ClassicRecords.css'


function ClassicRecords({ user }) {

    return (
        <section className='splash-section-3'>
            <GetAllListings user={user} />
        </section>
    )
}

export default ClassicRecords;
