import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { changeText, decrease, increase } from "store/exercise";
import Profile from "./Profile";

const Profiles = () => {
    // state 조회 (Read)
    const { counter, text, list } = useSelector((state) => ({
        counter: state.counter,
        text: state.text,
        list: state.list,
    }));
    // CUD는 dispatch를 이용한다.
    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onChangeText = (text) => dispatch(changeText(text));

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
            <button onClick={onIncrease}>상승</button>
            <button onClick={onDecrease}>하락</button>
            <input
                type="text"
                onChange={(e) => {
                    onChangeText(e.target.value);
                }}
            ></input>
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
