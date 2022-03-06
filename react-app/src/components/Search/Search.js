import { useDispatch } from "react-redux";
import { useHistory, Route } from "react-router-dom";
import React,{ useState } from "react";

import SearchedListings from "./SearchedListings";


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
        <form onSubmit={handleSubmit}>
            <input
            type='search'
            value={search}
            onChange={handleChange}
            />
            <button>b</button>
        </form>

            {/* <SearchedListings searched={searched} numItemSetter={numItemSetter} /> */}

        </>
    )
}

export default Search;
