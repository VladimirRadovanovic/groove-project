import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { editListing, getAllListings, createListing } from '../../../store/listings';
import './CreateListing.css'
import GoBackButton from '../../Utils/GoBackButton';
import { Modal } from '../../../context/Modal';
import logo from '../../../images/logo.svg'




function CreateListing({ user }) {
    const history = useHistory()
    const dispatch = useDispatch()
    const { recordId } = useParams()

    useEffect(() => {

        dispatch(getAllListings())
    }, [recordId, dispatch])

    const listings = useSelector(state => state.listings)


    let listing;
    if (recordId) {
        const listingId = Number(recordId)
        listing = listings[listingId]

    }


    const [artist, setArtist] = useState(listing?.artist || '')
    const [album, setAlbum] = useState(listing?.album || '')
    const [genre, setGenre] = useState(listing?.genre || '')
    const [description, setDescription] = useState(listing?.description || '')
    let [price, setPrice] = useState(listing?.price || '')
    const [condition, setCondition] = useState(listing?.condition || '')
    const [num_copies_available, setNum_copies_available] = useState(listing?.num_copies_available || '')
    const [errors, setErrors] = useState([])

    const [image, setImage] = useState(listing?.img_url || null);
    const [imageLoading, setImageLoading] = useState(false);
    const [photoPrev, setPhotoPrev] = useState('#')
    const [showModal, setShowModal] = useState(false)
    // if (!user) return <Redirect to='/login' />




    const onClose = () => {
        setShowModal(false)
        setImage(null)
    }


    const reset = () => {
        setArtist('')
        setAlbum('')
        setGenre('')
        setDescription('')
        setPrice('')
        setCondition('')
        setNum_copies_available('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();



        if (price?.toString().startsWith('$')) {
            price = parseFloat(price?.toString().slice(1).split(',').join('')).toFixed(2)

        } else {
            price = parseFloat(price?.toString().split(',').join('')).toFixed(2)

        }


        formData.append('artist', artist)
        formData.append('album', album)
        formData.append('genre', genre)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('num_copies_available', num_copies_available)
        formData.append('condition', condition)
        formData.append("image", image);

        setImageLoading(true)

        if (!listing) {

            const data = await dispatch(createListing(formData))

            if (data) {
                setErrors(data);
                setImageLoading(false)
            } else {
                setImageLoading(false)
                reset()
                history.push(`/user/profile`)
            }

        } else {
            // formData.append('id', listing.id)
            const data = await dispatch(editListing(formData, listing.id))

            if (data) {
                setErrors(data);
                setImageLoading(false)
            } else {
                setImageLoading(false)
                reset()
                history.push(`/user/profile`)
            }
        }


    }

    // const handleBack = () => {
    //     history.goBack()
    // }
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setShowModal(true)
        if(file) {
            setPhotoPrev(URL.createObjectURL(file))

        }

    }

    const handleUploadConfirm = () => {
        setImageLoading(true)
        setTimeout(() => {
            setImageLoading(false)
            setShowModal(false)
        },400)
    }

    return (
        <main className='create-main-container'>

            <GoBackButton />

            <div className='listings-form-main-container'>
                <div className='listings-errors-container'>
                    <ul className={errors?.length > 0 ? ('all-errors-list modal-errors-list') : ('hide-errors')}>
                        {errors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
                <div className='listings-form-container'></div>
                <form className='listings-form' onSubmit={handleSubmit}>
                <p className='optional-paragraph'>You may optionally upload a photo of the vinyl record that you are selling.</p>
                    <div>
                        <label htmlFor='artist'>Artist*</label>
                        <input
                            id='artist'
                            type='text'
                            placeholder='Artist'
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='album'>Album*</label>
                        <input
                            id='album'
                            type='text'
                            placeholder='Album*'
                            value={album}
                            onChange={(e) => setAlbum(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='genre'>Genre*</label>
                        <input
                            id='genre'
                            type='text'
                            placeholder='Genre'
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='condition'>Condition*</label>
                        <select
                            required
                            className='select-condition-tag'
                            placeholder='Please choose an option*'
                            id='condition'
                            type='text'
                            // selected={condition}
                            defaultValue={condition}
                            onChange={(e) => setCondition(e.target.value)}
                        >
                            <option value=''>Please choose an option</option>
                            <option value='New'>New</option>
                            <option value='Used - Like New'>Used - Like New</option>
                            <option value='Used - Very Good'>Used - Very Good</option>
                            <option value='Used - Good'>Used - Good</option>
                            <option value='Used - Acceptable'>Used - Acceptable</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='price'>Price*</label>


                        <NumberFormat
                            id='price'
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            thousandSeparator={true}
                            prefix="$"
                            className="some"
                            inputMode="numeric"
                            decimalScale={2}
                            fixedDecimalScale={true}
                            allowNegative={false}
                        />

                    </div>
                    <div>
                        <label htmlFor='copies'>Number of copies available*</label>
                        <input
                            id='copies'
                            type='number'
                            min={0}
                            placeholder='Number of copies available'
                            value={num_copies_available}
                            onChange={(e) => setNum_copies_available(e.target.value)}
                        />
                    </div>
                    <div className='description-container'>
                        <label htmlFor='description'>Description*</label>
                        <textarea
                            id='description'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <label className="photo-listing-upload-button" htmlFor="photo-listing-upload">
                        <input
                            id='photo-listing-upload'
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                        {listing ? 'Edit Listing Photo' : 'Upload Listing Photo'}
                    </label>
                    {listing ?
                        <button className='listing-button'>Save Changes</button> :
                        <button className='listing-button'>Post a Listing</button>
                    }
                </form>
            </div>
            <div className={listing ? `create-listing-img-container  listing-img-container` : 'edit-listing-img-container  listing-img-container'}>
                &nbsp;
            </div>
            {showModal && (
                <Modal onClose={onClose}>
                    <img src={photoPrev} alt='preview' />
                    <button className="upload-photo-button" onClick={handleUploadConfirm} type="submit">Confirm photo selection</button>
                    {(imageLoading) && (
                    <p>
                        <img className="upload-photo-logo" src={logo} alt='logo' />
                    </p>)}
                </Modal>
            )}
        </main>
    )
}

export default CreateListing;
