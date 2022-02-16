import { NavLink } from 'react-router-dom';

import './SplashPage.css'
import GetAllListings from '../Listings/GetListings/GetAllListings';


function SplashPage({ user }) {
return (
    <main className='splash-main-container'>
        <section className='splash-section-1'>
            <NavLink className='section-1-link' to={`/records/buy`}>
                <h2 className='section-1-title'>
                   SHOP NOW
                   <i className="fa-solid fa-play section-1-play"></i>
                </h2>
            </NavLink>
        </section>
        <GetAllListings user={user} />
    </main>
)
}

export default SplashPage;
