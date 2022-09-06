import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Profile from "./Profile";

const Home = () => {
    return (
        <div>
            <hr />
            <h1>홈</h1>
            <p>홈페이지</p>
            <div>
                <ul>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <li>
                        <Link to="/about">디테일</Link>
                    </li>
                </ul>
            </div>
            <hr />
        </div>
    );
};

export default Home;
