import React, { useState } from "react";

const CounterButton = () => {
    const [counter, setCounter] = useState(0);
    return (
        <>
            <div>{counter}</div>
            <button
                onClick={() => {
                    setCounter(counter + 1);
                }}
            >
                증가
            </button>
            <button
                onClick={() => {
                    setCounter(counter - 1);
                }}
            >
                감소
            </button>
        </>
    );
};

export default CounterButton;
