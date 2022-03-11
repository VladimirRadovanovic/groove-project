

// import './FilterListings.css'

import { useState } from "react";

function FilterListings({ filterByPrice }) {
    const [range, setRange] = useState(1000)
    const[drag,setDrag] = useState(1000)

    console.log(range, 'rangeeeeee')
    return (
        <div>
        <input
        value={range}
        onChange={(e) => setRange(e.target.value)}
        onMouseUp={filterByPrice}
        className='price-range'
        type='range'
        min='1'
        max='1000'
        />
        <p>Max price: ${Number(range)?.toFixed(2)}</p>
        </div>
    )
}

export default FilterListings;
