import { lighten } from "polished";
import React from "react";
import styled, { css } from "styled-components";

export const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: ${(props) => props.color || "black"};
    border-radius: 50%;
    &:hover {
        background: ${lighten(0.1, "#228be6")};
    }

    /* 색상 */
    ${({ theme, color }) => {
        const selected = theme.palette[color];
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.1, selected)};
            }
        `;
    }}
    ${(props) =>
        props.rect &&
        css`
            border-radius: 0%;
        `}
`;

Circle.defaultProps = {
    color: "red",
};
export default Circle;
