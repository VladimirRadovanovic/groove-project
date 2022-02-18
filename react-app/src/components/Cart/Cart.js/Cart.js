import { useState } from 'react'

import './Cart.css'
import placeholder from '../../../images/vinyl.jpg'

function Cart({ user }) {
    const [numItems, setNumItems] = useState({'0': 1})
    const [itemId, setItemId] = useState('')
    // const [oldState, setOldState] = useState(1)
    console.log(numItems, '**************numItems*******************')
    // console.log(oldState, 'oldState##############')
    console.log(numItems, 'numItems##############')

    const cartItems = Object.values(localStorage)
    // console.log(cartItems.length, 'length')
    // console.log(JSON.parse(cartItems[0]), 'cart items')
    const parsedItems = cartItems.map(item => (
        JSON.parse(item)
    ))

    const handleChange = (e, prevState) => {
        // console.log(prevState, 'prevState*********')
        setNumItems({...numItems, [e.target.id]: Number(e.target.value)})
        // setOldState(prevState)
        const eventId = e.target.id
        // const eventId = e.target.id.split('-')[1]
        // const inputField =document.getElementById(`item-${eventId}`)
        // const inputField = document.querySelectorAll('.cart-input-field')
        // console.log(inputField[1].value, 'fields*************')

        setItemId(Number(eventId))
    }

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
                         <img className='cart-img' src={placeholder} />
                        <div className='cart-data-container'>
                            <p>
                                {item?.album}
                            </p>
                            <p>
                                {item?.artist}
                            </p>
                            <p>
                                ${item?.price.toFixed(2)}
                            </p>
                        </div>
                        <div className='quantity-container'>
                             <input
                             className='cart-input-field'
                             id={item?.id}
                             type='number'
                            //  defaultValue={1}
                             value={numItems[`${item?.id}`] ? numItems[`${item?.id}`] : numItems['0']}
                             min={1}
                             placeholder='Quantity'
                             onChange={handleChange}
                             />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )

}

export default Cart;
