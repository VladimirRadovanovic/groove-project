import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/Modal";
import { authenticate } from "../../store/session";


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

        const res = await fetch('/api/users/upload-profile-photo', {
            method: "PUT",
            body: formData,
        });
        const data = await res.json();
        if (res.ok) {
            setImageLoading(false);
            dispatch(authenticate())
            setShowModal(false)
            return null
            // history.push("/images");
        }
        else if(data.errors) {
            setImageLoading(false);
            setUploadImgErrors(data.errors)
            // console.log("error");
            return null
            // a real app would probably use more advanced
            // error handling
        }
        else {
            setUploadImgErrors([['An error occurred. Please try again.']])
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];

            setImage(file);
            setPhotoPrev(URL.createObjectURL(file))
            setShowModal(true)

        }

        return (
            <form onSubmit={handleSubmit}>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
              />
               {showModal && (
                   <Modal onClose={onClose}>
                      <img src={photoPrev} />
                    <button onClick={handleSubmit} type="submit">Submit</button>
                    {(imageLoading)&& <p>Loading...</p>}
                </Modal>
               )}
        </form>
    )

    // const history = useHistory(); // so that we can redirect after the image upload is successful
    // const [image, setImage] = useState(null);
    // const [imageLoading, setImageLoading] = useState(false);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("image", image);

    //     // aws uploads can be a bit slow—displaying
    //     // some sort of loading message is a good idea
    //     setImageLoading(true);

    //     const res = await fetch('/api/images', {
    //         method: "POST",
    //         body: formData,
    //     });
    //     if (res.ok) {
    //         await res.json();
    //         setImageLoading(false);
    //         // history.push("/images");
    //     }
    //     else {
    //         setImageLoading(false);
    //         // a real app would probably use more advanced
    //         // error handling
    //         console.log("error");
    //     }
    // }

    // const updateImage = (e) => {
    //     const file = e.target.files[0];
    //     setImage(file);
    // }

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <input
    //           type="file"
    //           accept="image/*"
    //           onChange={updateImage}
    //         />
    //         <button type="submit">Submit</button>
    //         {(imageLoading)&& <p>Loading...</p>}
    //     </form>
    // )
}

export default UploadProfilePicture;
