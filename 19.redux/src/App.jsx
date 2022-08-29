import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";
import rootReducer from "store/index";
import { Provider } from "react-redux";
import { createStore } from "redux";

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

const store = createStore(rootReducer);

const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscripbe = store.subscribe(listener);

function App() {
    return (
        <>
            <ThemeProvider theme={AppPrimaryStyle}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home></Home>}></Route>
                            <Route
                                path="/about"
                                element={<About></About>}
                            ></Route>
                            {/* 서브 라우팅 */}
                            <Route
                                path="/profiles/*"
                                element={<Profiles></Profiles>}
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
