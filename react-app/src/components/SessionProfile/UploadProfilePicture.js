import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/Modal";
import { authenticate } from "../../store/session";
import { setUser } from "../../store/session";


function UploadProfilePicture() {
    const dispatch = useDispatch()
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState('#')
    const [showModal, setShowModal] = useState(false)
    const [errors, setErrors] = useState([]);
    const [uploadImgErrors, setUploadImgErrors] = useState([])

    const onClose = () => {
        setShowModal(false)
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
            console.log(data.errors, 'presed error data')
            if (data.errors) {
                setUploadImgErrors(data.errors)
                setImageLoading(false)
                return null
            }
        }
        else {
            setUploadImgErrors([['An error occurred. Please try again.']])
            setImageLoading(false)
            console.log("error");
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
            <input
                type="file"
                accept="image/*"
                onChange={updateImage}
            />
            {showModal && (
                <Modal onClose={onClose}>
                    <ul className='all-errors-list'>
                        {uploadImgErrors?.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                    <img src={photoPrev} />
                    <button onClick={handleSubmit} type="submit">Submit</button>
                    {(imageLoading) && <p>Loading...</p>}
                </Modal>
            )}
        </form>
    )

}

export default UploadProfilePicture;
