import { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/Modal";
import { updateOrder } from "../../store/orders";

function UpdateOrderForm({ onClose, onOpen, instructions, id }) {
    const dispatch = useDispatch()
    const [newInstructions, setNewInstructions] = useState(instructions)
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
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
            <div className="update-instructions-container">
                <h3 className="modal-heading">Update delivery instructions</h3>
                <div className='listings-errors-container'>
                    <ul className='all-errors-list'>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <form className="update-instructions-form" onSubmit={handleSubmit}>
                    <textarea
                    className="modal-textarea"
                        value={newInstructions}
                        onChange={(e) => setNewInstructions(e.target.value)}
                        placeholder="Update delivery instructions."
                    ></textarea>
                    <button className="update-instructions-button">Update instructions</button>
                </form>
            </div>
        </Modal>
    )
}

export default UpdateOrderForm;
