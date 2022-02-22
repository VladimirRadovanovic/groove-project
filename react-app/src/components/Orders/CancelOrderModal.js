import { ConfirmModal } from "../../context/Modal";

function CancelOrderModal({ handleCancelOrder, id, onCloseConfirm }) {
    return (
        <ConfirmModal onClose={onCloseConfirm}>
            <h3>Are you sure you would like to cancel this order?</h3>
            <button id={id} onClick={handleCancelOrder}>Yes</button>
            <button onClick={onCloseConfirm}>No</button>
        </ConfirmModal>
    )
}

export default CancelOrderModal;
