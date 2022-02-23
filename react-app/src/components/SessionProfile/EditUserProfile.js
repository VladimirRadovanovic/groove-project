import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { ProfileUpdateModal } from '../../context/Modal';
import './EditUserProfile.css'
import { updateUserInfo } from '../../store/session';

function EditUserProfile({ user, onClose }) {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState(user?.username || "");
    const [address, setAddress] = useState(user?.address || "");
    const [city, setCity] = useState(user?.city || "")
    const [state, setState] = useState(user?.state || "")
    const [zip_code, setZip_code] = useState(user?.zip_code || "")
    const [country, setCountry] = useState(user?.country || "")



    // const user = useSelector(state => state.session.user);

    const updateUsername = (e) => {
        setUsername(e.target.value);
      };

      const updateAddress = (e) => {
        setAddress(e.target.value)
      }

      const updateCity = (e) => {
        setCity(e.target.value)
      }

      const updateState = (e) => {
        setState(e.target.value)
      }

      const updateZip_code = (e) => {
        setZip_code(e.target.value)
      }

      const updateCountry = (e) => {
        setCountry(e.target.value)
      }


      const handleSubmit = async(e) => {
        e.preventDefault()
        const payload = {
            id: user?.id,
            username,
            address,
            city,
            state,
            zip_code,
            country
        }
        const data = await dispatch(updateUserInfo(payload))
        if(data) {
            setErrors(data)
        } else {
            onClose()
        }
      }


    return (
        <ProfileUpdateModal onClose={onClose} >
            <div className='update-profile-form-container'>
                <form onSubmit={handleSubmit} className='update-profile-form'>
                    <h2>Update Profile Information</h2>
                    <div className='auth-errors-container'>
                        {errors.map((error, ind) => (
                            <div key={ind}>{error}</div>
                        ))}
                    </div>
                    <div className='update-profile-group-container'>
                        <div className='form-group-profile'>
                            <label htmlFor='username-profile'>User Name*</label>
                            <input
                                placeholder='Username*'
                                id='username-profile'
                                type='text'
                                name='username'
                                onChange={updateUsername}
                                value={username}
                            ></input>
                        </div>
                        <div className='form-group-profile'>
                            <label htmlFor='address-profile'>Address*</label>
                            <input
                                placeholder='Address*'
                                id='address-profile'
                                type='text'
                                name='address'
                                onChange={updateAddress}
                                value={address}
                            ></input>
                        </div>
                        <div className='form-group-profile'>
                            <label htmlFor='city-profile'>City*</label>
                            <input
                                placeholder='City*'
                                id='city-profile'
                                type='text'
                                name='city'
                                onChange={updateCity}
                                value={city}
                            ></input>
                        </div>
                        <div className='form-group-profile'>
                            <label htmlFor='state-profile'>State</label>
                            <input
                                placeholder='State (Example: MA)'
                                id='state-profile'
                                type='text'
                                name='state'
                                onChange={updateState}
                                value={state}
                            ></input>
                        </div>
                        <div className='form-group-profile'>
                            <label htmlFor='zip_code-profile'>Zip code*</label>
                            <input
                                placeholder='Zip code*'
                                id='zip_code-profile'
                                type='text'
                                name='zip_code'
                                onChange={updateZip_code}
                                value={zip_code}
                            ></input>
                        </div>
                        <div className='form-group-profile'>
                            <label htmlFor='country-profile'>Country*</label>
                            <input
                                placeholder='Country*'
                                id='country-profile'
                                type='text'
                                name='country'
                                onChange={updateCountry}
                                value={country}
                            ></input>
                        </div>

                    </div>
                    <button id={`updateuser-${user?.id}`} className='update-profile-button'>Save Changes</button>
                </form>
            </div>

        </ProfileUpdateModal>
    )
}

export default EditUserProfile;
