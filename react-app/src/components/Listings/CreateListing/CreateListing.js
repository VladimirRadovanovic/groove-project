import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

import './CreateListing.css'
import { createListing } from '../../../store/listings';


function CreateListing({ user }) {
    const dispatch = useDispatch()
    const [artist, setArtist] = useState('')
    const [album, setAlbum] = useState('')
    const [genre, setGenre] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [condition, setCondition] = useState('')
    const [num_copies_available, setNum_copies_available] = useState('')
    const [errors, setErrors] = useState([])
    // if (!user) return <Redirect to='/login' />

    // const url = window.location.href
    // console.log(url, 'create url')

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append('artist', artist)
        formData.append('album', album)
        formData.append('genre', genre)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('num_copies_available', num_copies_available)
        formData.append('condition', condition)

        const data = await dispatch(createListing(formData))

        if(data) {
            setErrors(data);
        }

    }

    return (
        <>
            <ul>
                {errors.map(error => (
                    <li key={error}>{error}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <label>Artist</label>
                <input
                type='text'
                placeholder='Artist'
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                />
                <label>Album</label>
                <input
                type='text'
                placeholder='Album'
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                />
                <label>Genre</label>
                <input
                type='text'
                placeholder='Genre'
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                />
                <label>Description</label>
                <textarea
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <label>Condition</label>
                <input
                type='text'
                placeholder='Condition'
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                />
                <label>Price</label>
                <input
                type='number'
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                />
                <label>Number of copies available</label>
                <input
                type='number'
                placeholder='Number of copies available'
                value={num_copies_available}
                onChange={(e) => setNum_copies_available(e.target.value)}
                />
                <button>Make a listing</button>
            </form>
        </>
    )
}

export default CreateListing;
