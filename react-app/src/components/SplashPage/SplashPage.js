import { NavLink } from 'react-router-dom';

import './SplashPage.css'
import GetAllListings from '../Listings/GetListings/GetAllListings';


function SplashPage({ user }) {
return (
    <main className='splash-main-container'>
        <section className='splash-section-1 section'>
            <NavLink className='section-1-link section-link' to={`/records/buy`}>
                <h2 className='section-1-title section-title'>
                   SHOP NOW
                   <i className="fa-solid fa-play section-1-play section-icon"></i>
                </h2>
            </NavLink>
        </section>
        <section className='splash-section-2 section'>
            <NavLink className='section-2-link section-link' to={`/records/buy`}>
                <h2 className='section-2-title section-title'>
                   SELL
                   <i className="fa-solid fa-play section-2-play section-icon"></i>
                </h2>
            </NavLink>
        </section>
        <GetAllListings user={user} />
    </main>
)
}

export default SplashPage;
