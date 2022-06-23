import { NavLink, useHistory, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"



import placeholder from '../../../images/vinyl.jpg'
import FilterListings from "../FilterListings/FilterListings"
import './DisplayListings.css'
import { getNews } from "../../../store/news"
import { useLayoutEffect } from "react"


function DisplayListings({ listingsList, numItemSetter, searchedList }) {
    const [searchedListingsState, setSearchedListingsState] = useState('')
    const [priceFilter, setPriceFilter] = useState(1000)
    const news = useSelector(state => state.news)

    const dispatch = useDispatch()

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    },[]);

    useEffect(() => {
        dispatch(getNews())
    },[])


    let url = window.location.href


    const filterByPrice = (e) => {
        setPriceFilter(e.target.value)
    }

    const filterListingsList = listingsList.filter(listing => (
        listing?.price <= priceFilter
    ))



    const history = useHistory()

    const handleAddToCart = (e) => {
        const id = Number(e.target.id)


        const cartListing = listingsList.filter(listing => (
            listing.id === id
        ))
        localStorage.setItem(id, JSON.stringify(cartListing[0]))
        let numItems = ''
        if (localStorage.getItem('searched')) {
            numItems = Object.values(localStorage).length - 1
        } else {
            numItems = Object.values(localStorage).length
        }

        numItemSetter(numItems)
        setSearchedListingsState(numItems)
        history.push('/cart')

    }
    return (
        <>
            {!url?.endsWith('/') && <div className="news-container">
                {news?.map((n, i) => (
                    <div className="news-card" key={i}>
                        <Link className="news-card-link" target="_blank" to={{ pathname: 'https://www.kerrang.com' + n?.url }}>
                            <img alt={n?.title.split('=')[1].split('"')[1]} src={`${n?.title.split('=')[3].slice(1)}`} />
                            <span>
                                {n?.title.split('=')[1].split('"')[1]}

                            </span>
                        </Link>
                    </div>
                ))}
            </div>}
            {!url?.endsWith('/') && <FilterListings filterByPrice={filterByPrice} />}
            <div className='splash-article-container'>
                {filterListingsList?.map(listing => (
                    <article className='section-3-article article' key={listing?.id}>
                        <div className='article-side article-front'>
                            <div className='section-3-img-container article-img-container'>
                                <img src={listing?.img_url ? listing?.img_url : placeholder}
                                    className='section-3-img article-img' alt='record' />
                            </div>
                            <div className='article-front-text-container'>
                                <p className='album-text'>
                                    {listing?.album}
                                </p>
                                <p className='artist-text'>
                                    {listing?.artist}
                                </p>
                                <p className='price-text'>
                                    ${listing?.price.toFixed(2)}
                                </p>
                            </div>

                        </div>
                        <div className='article-side article-back'>
                            <div className='article-back-text-container'>
                                <h3 className='article-back-heading'>Description</h3>
                                <p className='article-back-text'>
                                    {listing?.description}
                                </p>
                            </div>
                            <div className='article-button-box'>

                                <button onClick={handleAddToCart} id={listing?.id} className='cart-button'>Add to Cart</button>


                                {/* <AddToCart listing={listing} /> */}
                                <NavLink to={`/records/${listing?.id}/details`} className='details-link'>View Details</NavLink>
                            </div>
                        </div>
                    </article>
                ))}

            </div>
        </>
    )
}

export default DisplayListings
