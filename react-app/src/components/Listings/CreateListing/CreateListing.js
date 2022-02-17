import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { editListing, getAllListings, createListing } from '../../../store/listings';
import './CreateListing.css'



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
    const [price, setPrice] = useState(listing?.price || '')
    const [condition, setCondition] = useState(listing?.condition || '')
    const [num_copies_available, setNum_copies_available] = useState(listing?.num_copies_available || '')
    const [errors, setErrors] = useState([])
    // if (!user) return <Redirect to='/login' />

    // const url = window.location.href



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


        formData.append('artist', artist)
        formData.append('album', album)
        formData.append('genre', genre)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('num_copies_available', num_copies_available)
        formData.append('condition', condition)

        if (!listing) {

            const data = await dispatch(createListing(formData))

            if (data) {
                setErrors(data);
            } else {
                reset()
                history.push(`/users/${user?.id}/profile`)
            }

        } else {
            // formData.append('id', listing.id)
            const data = await dispatch(editListing(formData, listing.id))

            if (data) {
                setErrors(data);
            } else {
                reset()
                history.push(`/users/${user?.id}/profile`)
            }
        }


    }

    return (
        <main className='create-main-container'>
            <div className='listings-form-main-container'>
            <div className='listings-errors-container'>
            <ul>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            </div>
            <div className='listings-form-container'></div>
            <form className='listings-form' onSubmit={handleSubmit}>
                <div>
                <label>Artist</label>
                <input
                    type='text'
                    placeholder='Artist'
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                />
                </div>
                <div>
                <label>Album</label>
                <input
                    type='text'
                    placeholder='Album'
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                />
                </div>
                <div>
                <label>Genre</label>
                <input
                    type='text'
                    placeholder='Genre'
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />
                </div>
                <div>
                <label>Condition</label>
                <select
                    type='text'
                    placeholder='Condition'
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
                <label>Price</label>
                <input
                    type='number'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </div>
                <div>
                <label>Number of copies available</label>
                <input
                    type='number'
                    min={0}
                    placeholder='Number of copies available'
                    value={num_copies_available}
                    onChange={(e) => setNum_copies_available(e.target.value)}
                />
                </div>
                <div className='description-container'>
                <label>Description</label>
                <textarea
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                {listing ?
                    <button className='listing-button'>Edit Listing</button> :
                    <button className='listing-button'>Post a Listing</button>
                }
            </form>
            </div>
            <div className={listing ? `create-listing-img-container  listing-img-container` : 'edit-listing-img-container  listing-img-container'}>
                &nbsp;
            </div>
        </main>
    )
}

export default CreateListing;
