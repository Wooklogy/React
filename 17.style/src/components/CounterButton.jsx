import React, { useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

const CounterButton = () => {
    const [counter, dispatch] = useReducer(reducer, 0);
    return (
        <>
            <div>{counter}</div>
            <button
                onClick={() => {
                    dispatch({ type: "INCREMENT" });
                }}
            >
                증가
            </button>
            <button
                onClick={() => {
                    dispatch({ type: "DECREMENT" });
                }}
            >
                감소
            </button>
        </>
    );
};

export default CounterButton;
