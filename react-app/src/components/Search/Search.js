import { useDispatch } from "react-redux";
import { useHistory, Route } from "react-router-dom";
import React,{ useState } from "react";

import SearchedListings from "./SearchedListings";
import './Search.css'


function Search({ handelSearchListings }) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [search, setSearch] = useState('')

    // const [searched, setSearched] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()



            const response = await fetch('/api/search/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(search)
            })
            if(response.ok) {
                const data = await response.json()
                // setSearched(data.searched)
                handelSearchListings(data.searched)
                // localStorage.setItem('searched', JSON.stringify(data.searched))
                history.push('/records/searched')
                setSearch('')
                return null
            } else {
                // handelSearchListings(['Invalid search. Please try again.'])
            }

    }

    const handleChange = (e) => {
        setSearch(e.target.value)
    }


    return (
        <>
        <form className="search-form" onSubmit={handleSubmit}>
            <input
            placeholder="Search by album or artist"
            className="search-input"
            type='search'
            value={search}
            onChange={handleChange}
            />
            <button className="search-button"><i className="fa-solid fa-magnifying-glass"></i></button>
        </form>

            {/* <SearchedListings searched={searched} numItemSetter={numItemSetter} /> */}

        </>
    )
}

export default Search;
