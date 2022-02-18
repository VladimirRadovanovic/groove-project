

import './Cart.css'

function Cart({ user }) {
    const cartItems = Object.values(localStorage)
    console.log(cartItems.length, 'length')
    console.log(JSON.parse(cartItems[0]), 'cart items')
    const parsedItems = cartItems.map(item => (
        JSON.parse(item)
    ))

    return (
        <main className='main-cart-container'>
            <div className='cart-page-container'>
                <div className='cart-heading'>
                    <h2>
                        Your Cart
                    </h2>
                    <button className='checkout-button-cart'>
                    <i className="fa-solid fa-cart-shopping"></i>
                        Checkout
                    </button>
                </div>
        {parsedItems.map((item) => (

            <div className='cart-article-container' key={item?.id}>
                {item?.album}
            </div>
        ))}
            </div>
        </main>
    )

}

export default Cart;
