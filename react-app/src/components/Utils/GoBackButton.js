import { useHistory } from "react-router-dom";

import './GoBackButton.css'

function GoBackButton() {
    const history = useHistory()

    const handleBack = () => {
        history.goBack()
    }

    return (
        <div onClick={handleBack} className='back-button-container'>
        <i className="fa-solid fa-arrow-left-long back-button"></i>
        <span>Go back</span>
        </div>
    )
}

export default GoBackButton;
