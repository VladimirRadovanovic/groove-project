import { ConfirmModal } from "../../context/Modal";

function CancelOrderModal({ handleCancelOrder, id, onCloseConfirm }) {
    return (
        <ConfirmModal onClose={onCloseConfirm}>
            <h3>Are you sure you would like to cancel this order?</h3>
            <div className="confirm-button-container">
            <button className="confirm-delete" id={id} onClick={handleCancelOrder}>Yes</button>
            <button className="cancel-delete" onClick={onCloseConfirm}>No</button>
            </div>
        </ConfirmModal>
    )
}

export default CancelOrderModal;
