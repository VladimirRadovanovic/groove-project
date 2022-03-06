import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import React,{ useState } from "react";

function Search() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [search, setSearch] = useState('')
    const [searched, setSearched] = useState([])

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
            const data = response.json()
            setSearched(data)
            return null
        } else {
            setSearched(['Invalid search. Please try again.'])
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
        </>
    )
}

export default Search;
