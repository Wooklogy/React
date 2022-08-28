import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";

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
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route path="/about" element={<About></About>}></Route>
                        {/* 서브 라우팅 */}
                        <Route
                            path="/profiles/*"
                            element={<Profiles></Profiles>}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
