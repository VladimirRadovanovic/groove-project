import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/Modal";

import { setUser } from "../../store/session";
import logo from '../../images/logo.svg'


function UploadProfilePicture() {
    const dispatch = useDispatch()
    // const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState('#')
    const [showModal, setShowModal] = useState(false)

    const [uploadImgErrors, setUploadImgErrors] = useState([])

    const onClose = () => {
        setShowModal(false)
        setUploadImgErrors([])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const response = await fetch('/api/users/upload-profile-photo', {
            method: "PUT",
            body: formData,
        });
        if (response.ok) {
            const data = await response.json();
            // if (data.errors) {
            //     setImageLoading(false);
            //     setUploadImgErrors(data.errors)
            //     return null
            // }
            setImageLoading(false);
            dispatch(setUser(data.user))
            setShowModal(false)
            setImage(null)
            return null
            // history.push("/images");
        }
        // else if(data.errors) {
        //     setImageLoading(false);
        //     setUploadImgErrors(data.errors)
        //     // console.log("error");
        //     return null
        //     // a real app would probably use more advanced
        //     // error handling
        // }
        else if (response.status < 500) {
            const data = await response.json();

            if (data.errors) {
                setUploadImgErrors(data.errors)
                setImageLoading(false)
                return null
            }
        }
        else {
            setUploadImgErrors([['An error occurred. Please try again.']])
            setImageLoading(false)

        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setShowModal(true)
        if(file) {
            setPhotoPrev(URL.createObjectURL(file))

        }

    }

    return (
        <form>
            <label className="photo-upload-label session-heading-button" htmlFor="photo-upload">
            <input
                id='photo-upload'
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            Upload photo
            </label>
            {showModal && (
                <Modal onClose={onClose}>
                    <ul className={uploadImgErrors?.length > 0 ? ('all-errors-list modal-errors-list') : ('hide-errors')}>
                        {uploadImgErrors?.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <img src={photoPrev} alt='preview'/>
                    <button className="upload-photo-button" onClick={handleSubmit} type="submit">Upload</button>
                    {(imageLoading) && (
                    <p>
                        <img className="upload-photo-logo" src={logo} alt='logo' />
                    </p>)}
                </Modal>
            )}
        </form>
    )

}

export default UploadProfilePicture;
