

import { useState } from "react";


import './Filter.css'


function FilterListings({ filterByPrice }) {
    const [range, setRange] = useState(1000)
    const[drag,setDrag] = useState(1000)

    let sliderRange = (range / 10 - 3).toString()
    console.log('slider', sliderRange)

    console.log(range, 'rangeeeeee')
    return (
        <div className="filter-container">
            <h3>Filter by Price</h3>
            <p>Max price: ${Number(range)?.toFixed(2)}</p>
            <p className="price-1000">$1000.00</p>
            <p className="price-0">$0.00</p>
        <div className="slider-container">
            <div style={{bottom: `${sliderRange}%`}} className="slider-prev"><div className="slider-prev-text">${Number(range)?.toFixed(2)}</div></div>
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
        </div>
    )
}

export default FilterListings;
