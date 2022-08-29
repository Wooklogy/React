import React from "react";
import "scss/Button.scss";

function Button({ children, size, color }) {
    return <button className={`Button ${size} ${color}`}>{children}</button>;
}

Button.defaultProps = {
    size: "medium",
    color: "blue",
};

export default Button;
