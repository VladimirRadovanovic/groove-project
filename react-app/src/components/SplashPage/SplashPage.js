import { NavLink } from 'react-router-dom';

import './SplashPage.css'

import ClassicRecords from './ClassicRecords';


function SplashPage({ user, numItemSetter }) {
    return (
        <main className='splash-main-container'>
            <section className='splash-section-1 section'>
                <NavLink className='section-1-link section-link' to={`/records/all`}>
                    <h2 className='section-1-title section-title'>
                        SHOP NOW
                        <i className="fa-solid fa-play section-1-play section-icon"></i>
                    </h2>
                </NavLink>
            </section>
            <section className='splash-section-2 section'>
                <NavLink className='section-2-link section-link' to={`/users/${user?.id}/records/sell-record`}>
                    <h2 className='section-2-title section-title'>
                        SELL
                        <i className="fa-solid fa-play section-2-play section-icon"></i>
                    </h2>
                </NavLink>
            </section>
            <ClassicRecords numItemSetter={numItemSetter} user={user} />
        </main>
    )
}

export default SplashPage;
