import { useDispatch } from "react-redux";
import { checkout } from "../../../store/orders";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Checkout({ user, clearCart, items, errorSetter, totalCost, deliveryInstructions }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleCheckout = async() => {

        if (!user) {
            history.push('/login')
            return null
        }
        const mappedItems = items.map(item => {
            if(!item.cart_item_num) {
                item.cart_item_num = 1
            }
            return item
        })
        const payload = {
            user_id: user.id,
            items: mappedItems,
            total_cost: totalCost,
            delivery_instructions: deliveryInstructions
        }
        const data = await dispatch(checkout(payload))
        if(data) {
            errorSetter(data)
        } else {
            clearCart()
            errorSetter([])
            history.push('/user/profile/orders')
        }

    }


    return (
        <>
            <button onClick={handleCheckout} className='checkout-button-cart'>
                <i className="fa-solid fa-cart-shopping"></i>
                Checkout
            </button>
        </>
    )

}

export default Checkout;
