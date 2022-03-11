
import { useState } from "react";


import './FilterListings.css'

function FilterListings({ filterByPrice }) {
    const [range, setRange] = useState(1000)
    const[drag,setDrag] = useState(1000)

    console.log(range, 'rangeeeeee')
    return (
        <div className="filter-container">
            <h3>Filter by Price</h3>
            <p>Max price: ${Number(range)?.toFixed(2)}</p>
            <p className="price-1000">$1000.00</p>
            <p className="price-0">$0.00</p>
        <input
        // style={{'accent-color': 'red'}}
        value={range}
        onChange={(e) => setRange(e.target.value)}
        onMouseUp={filterByPrice}
        className='price-range'
        type='range'
        min='1'
        max='1000'
        />
        </div>
    )
}

export default FilterListings;
