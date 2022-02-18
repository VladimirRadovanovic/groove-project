// import '../../Listings/ListingDetails/ListingDetails.css'

function AddToCart({ listing }) {

    return (
        <button id={listing?.id} className='cart-button details-cart-button'>Add to Cart</button>
    )

}

export default AddToCart;
