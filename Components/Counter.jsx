import React from "react"

const Counter = ({count, setCount}) => {

    const changeCount = delta => setCount(count + delta) 

    return (
    <span>
        <button onClick={() => changeCount(-1)}>-</button>
        {count}
        <button onClick={() => changeCount(1)}>+</button>
    </span>
    )
}

export default Counter