import React from "react";

const Hi = ({ color, text }) => {
    return <div style={{ color: color }}>{text}</div>;
};

Hi.defaultProps = {
    color: "red",
    text: "기본값",
};

export default Hi;
