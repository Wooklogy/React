import React, { useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
    const navi = useNavigate();

    // 뒤로가기
    // 두번 뒤로 가고싶다면 -2 (뒤로가고 싶은 만큼 -n)
    const goBack = () => {
        navi(-1);
    };

    // 홈으로 가기
    const goHome = () => {
        navi("/");
    };

    // 앞으로가기
    // 두번 앞으로 가고싶다면 2 (앞으로 가고 싶은 만큼 n)
    const goForward = () => {
        navi(1);
    };
    useEffect(() => {});
    return (
        <div>
            <h3>유저 목록:</h3>
            <ul>
                <li>
                    <Link to="/profiles/artlogy">artlogy</Link>
                </li>
                <li>
                    <Link to="/profiles/ana">ana</Link>
                </li>
            </ul>
            <Routes>
                <Route
                    path="/*"
                    element={<div>유저를 선택해주세요.</div>}
                ></Route>
                <Route path=":username" element={<Profile></Profile>}></Route>
            </Routes>
        </div>
    );
};

export default Profiles;
