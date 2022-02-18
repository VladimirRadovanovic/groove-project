

import './Cart.css'

function Cart({ user }) {
    const cartItems = Object.values(localStorage)
    console.log(cartItems.length, 'length')
    console.log(JSON.parse(cartItems[0]), 'cart items')
    const parsedItems = cartItems.map(item => (
        JSON.parse(item)
    ))

    return (
        <>
        {parsedItems.map((item) => (

            <div key={item?.id}>
                {item?.album}
            </div>
        ))}

        </>
    )

}

export default Cart;
