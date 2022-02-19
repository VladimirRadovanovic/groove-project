import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import './Cart.css'
import placeholder from '../../../images/vinyl.jpg'

function Cart({ user, numItemSetter }) {
    const [numItems, setNumItems] = useState({'0': 1})
    const [itemId, setItemId] = useState('')

    console.log(numItems, 'storedItems!!!!!!')

    useEffect(() => {
        const renderedItems = Object.values(localStorage)
        const parsedItemsRender = renderedItems.map(item => (
            JSON.parse(item)
        ))
            const obj = {}
            parsedItemsRender.forEach(pars => {
                obj[`${pars.id}`] = pars['cart_item_num']
            })

            setNumItems({...numItems, ...obj})
    }, [])

    const cartItems = Object.values(localStorage)

    let parsedItems = cartItems.map(item => (
        JSON.parse(item)

    ))

    const handelClearCart = (e) => {
        const storageKeys = Object.keys(localStorage)
        storageKeys.forEach(key => {
            localStorage.removeItem(key)
        })
        setNumItems({'0': 1})
        numItemSetter(0)
    }



    const handleRemoveItem = (e) => {
        const id = e.target.id
        console.log(id, 'in remove id')

        localStorage.removeItem(id)
        delete numItems[id]
        setNumItems({...numItems})
        const len = Object.keys(localStorage).length
        numItemSetter(len)

    }


    const handleChange = async(e) => {

        setNumItems({...numItems, [e.target.id]: Number(e.target.value)})

        const eventId = e.target.id

        const storageItem = await JSON.parse(localStorage.getItem(eventId))

        if (e.target.value < numItems[eventId]) {
            storageItem['cart_item_num'] = numItems[eventId] - 1
        } else {

            storageItem['cart_item_num'] = numItems[eventId] + 1
        }


        await localStorage.removeItem(eventId)
        localStorage.setItem(eventId, JSON.stringify(storageItem))


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
                             value={numItems[`${item?.id}`] ? numItems[`${item?.id}`] : (numItems['0'] ? numItems['0'] : 1)}
                             min={1}
                             placeholder='Quantity'
                             onChange={handleChange}
                             />
                        </div>
                        <div>
                        <i id={item?.id} onClick={handleRemoveItem} className="fa-solid fa-circle-xmark remove-item-button"></i>
                        </div>
                    </div>
                ))}
                <button onClick={handelClearCart} className='clear-cart-button'>Clear Cart</button>
                <NavLink to='/records/all' className='continue-shopping-button'>Continue Shopping</NavLink>
            </div>
        </main>
    )

}

export default Cart;
