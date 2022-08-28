import React from "react";
import { ThemeProvider } from "styled-components";
import Circle from "styles/Circle";

const AppPrimaryStyle = {
    palette: {
        primaryColor: "#ff00ff",
        blue: "#228be6",
        gray: "#495057",
        pink: "#f06595",
    },
    layout: {
        maxSizeX: "1200px",
        maxSizeY: "800px",
    },
};

function App() {
    return (
        <>
            <ThemeProvider theme={AppPrimaryStyle}>
                <div className="App">
                    <Circle color="blue" rect></Circle>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
