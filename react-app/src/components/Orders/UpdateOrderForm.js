import { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/Modal";
import { updateOrder } from "../../store/orders";

function UpdateOrderForm({ onClose, onOpen, instructions, id}) {
    const dispatch = useDispatch()
    const [newInstructions, setNewInstructions] = useState(instructions)
    const [errors, setErrors] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = await dispatch(updateOrder(id, newInstructions))
        if (data) {
            setErrors(data)
        } else {
            onClose()

        }
    }


    return (
        <Modal onClose={onClose} >
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                value={newInstructions}
                onChange={(e) => setNewInstructions(e.target.value)}
                placeholder="Update delivery instructions."
                ></textarea>
                <button>Update instructions</button>
            </form>
        </div>
        </Modal>
    )
}

export default UpdateOrderForm;
