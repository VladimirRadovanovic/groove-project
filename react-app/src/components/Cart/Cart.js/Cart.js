import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import './Cart.css'
import placeholder from '../../../images/vinyl.jpg'
import Checkout from './Checkout'
import GoBackButton from '../../Utils/GoBackButton'

function Cart({ user, numItemSetter }) {
    const [numItems, setNumItems] = useState({ '0': 1 })
    const [itemId, setItemId] = useState('')
    const [calcPrice, setCalcPrice] = useState(0)
    const [errors, setErrors] = useState([])
    const [deliveryInstructions, setDeliveryInstructions] = useState('')
    const [showDeliveryInstructions, setShowDeliveryInstructions] = useState(false)


    const errorSetter = (data) => {
        setErrors(data)
    }


    useEffect(() => {
        const itemPricesArr = document.querySelectorAll('.item-price-added')
        if (itemPricesArr?.length > 0) {
            let total = 0
            itemPricesArr.forEach(field => {
                total += parseFloat(field?.innerHTML.slice(1))
            })

            setCalcPrice(total)

        }

    }, [numItems, itemId, calcPrice])



    useEffect(() => {
        const renderedItems = Object.values(localStorage)
        const parsedItemsRender = renderedItems.map(item => (
            JSON.parse(item)
        ))
        const obj = {}
        // let totalPrice;
        parsedItemsRender.forEach(pars => {
            obj[`${pars.id}`] = pars['cart_item_num'] || 1
            // obj[`${pars.id}`] = {}
            // console.log(pars['price'], pars['cart_item_num'] || 1, 'my math*****')
            // totalPrice += pars['price'] * pars['cart_item_num'] || 1
        })

        setNumItems({ ...numItems, ...obj })
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
        setNumItems({ '0': 1 })
        numItemSetter(0)
        setErrors([])
    }



    const handleRemoveItem = (e) => {
        const id = e.target.id

        localStorage.removeItem(id)
        delete numItems[id]
        setNumItems({ ...numItems })
        const len = Object.keys(localStorage).length
        numItemSetter(len)

    }


    const handleChange = (e) => {
        const eventId = e.target.id

        // if(e.target.value < numItems[eventId]) {
        //     setNumItems({ ...numItems, [e.target.id]: Number(e.target.value) - 1 })
        // } else {

        setNumItems({ ...numItems, [e.target.id]: Number(e.target.value)})
        // }

        const storageItem = JSON.parse(localStorage.getItem(eventId))

        if (e.target.value < numItems[eventId]) {
            storageItem['cart_item_num'] = numItems[eventId] - 1
        } else {

            storageItem['cart_item_num'] = numItems[eventId] + 1
        }


        localStorage.removeItem(eventId)
        localStorage.setItem(eventId, JSON.stringify(storageItem))


        setItemId(Number(eventId))
    }

    const handleShowInstructions = () => {
        if(showDeliveryInstructions) {
            setShowDeliveryInstructions(false)
        } else {
            setShowDeliveryInstructions(true)
        }
    }

    const handelDeliveryInstructions = (e) => {
        setDeliveryInstructions(e.target.value)
    }



    return (
        <main className='main-cart-container'>
            <GoBackButton />
            <div className='cart-page-container'>
                <div className='cart-heading'>
                    <h2>
                        Your Cart
                    </h2>
                    {/* <button className='checkout-button-cart'>
                        <i className="fa-solid fa-cart-shopping"></i>
                        Checkout
                    </button> */}
                    <Checkout user={user} clearCart={handelClearCart} items={parsedItems} errorSetter={errorSetter} totalCost={calcPrice} deliveryInstructions={deliveryInstructions} />
                </div>
                <div className='listings-errors-container'>
                    <ul className='all-errors-list'>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                {parsedItems.length === 0 && <h2 className='cart-empty-heading'>Your cart is empty.</h2>}
                {parsedItems.map((item) => (

                    <div className='cart-article-container' key={item?.id}>
                        <img className='cart-img' src={item?.img_url ? item?.img_url : placeholder} />
                        <div className='cart-data-container'>
                            <p>
                                <strong>Album:</strong> {item?.album}
                            </p>
                            <p>
                            <strong>Artist:</strong> {item?.artist}
                            </p>
                            <p>
                            <strong>Price: </strong>${item?.price.toFixed(2)}
                            </p>
                            <p>
                            <strong>Available copies:</strong> {item?.num_copies_available}
                            </p>
                            <p >
                            <strong>Price * Copies: </strong><span className='item-price-added'>${(item?.price * numItems[item.id] || item?.price).toFixed(2)}</span>
                            </p>
                            {/* <p>
                                total = {calcPrice === 0 ? item?.price.toFixed(2) : calcPrice.toFixed(2)}
                            </p> */}
                        </div>
                        <div className='quantity-container'>
                            <label>
                            <strong>Number of copies:</strong>
                            </label>
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
                        <div className='cart-remove-button-container'>
                            <i id={item?.id} onClick={handleRemoveItem} className="fa-solid fa-circle-xmark remove-item-button"></i>
                        </div>
                    </div>
                ))}
                <div>
                    <p className='delivery-paragraph'>We will always deliver to your front door, unless instructed differently. <span className='set-delivery-span' onClick={handleShowInstructions}>Set Delivery Instruction <i className="fa-solid fa-chevron-down"></i></span></p>
                    {showDeliveryInstructions &&
                        <textarea
                        className='delivery-instructions-text'
                        type='text'
                        placeholder='Delivery instructions'
                        value={deliveryInstructions}
                        onChange={handelDeliveryInstructions}
                        ></textarea>
                    }
                </div>
                <div className='order-total-cart'>Order total: {calcPrice === 0 || Object.keys(numItems).length === 1 ? null : `$${calcPrice.toFixed(2)}`}</div>
                <div className='delivery'>Guaranteed two day delivery!</div>
                <button onClick={handelClearCart} className='clear-cart-button'>Clear Cart</button>
                <NavLink to='/records/all' className='continue-shopping-button'>Continue Shopping</NavLink>
            </div>
        </main>
    )

}

export default Cart;
