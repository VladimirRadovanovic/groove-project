

import './SplashPage.css'
import GetAllListings from '../Listings/GetListings/GetAllListings';


function SplashPage({ user }) {
return (
    <main className='splash-main-container'>
        <section className='splash-section-1'>

        </section>
        <GetAllListings user={user} />
    </main>
)
}

export default SplashPage;
