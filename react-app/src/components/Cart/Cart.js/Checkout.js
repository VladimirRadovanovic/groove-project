import { useDispatch } from "react-redux";
import { checkout } from "../../../store/orders";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Checkout({ user, clearCart, items }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleCheckout = () => {
        console.log('in handle checkout')
        if (!user) {
            history.push('/login')
            return null
        }
        const payload = {
            user_id: user.id,
            items: JSON.stringify(items)
        }
        dispatch(checkout(payload))
        clearCart()

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
