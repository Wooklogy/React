import React from "react";

const Hello = (props) => {
    return (
        <>
            <div>안녕하세요 {props.name}</div>
            {props.isCondition ? <b>True</b> : null}
        </>
    );
};

export default Hello;
