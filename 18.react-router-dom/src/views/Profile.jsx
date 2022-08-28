import React from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";

const profileData = {
    artlogy: {
        name: "장현욱",
        description: "stupid engineer",
    },
    ana: {
        name: "아나",
        description: "전래동화의 주인공",
    },
};

const Profile = () => {
    const { username } = useParams();
    const profile = profileData[username];
    if (!profile) {
        return <div>존재하지 않는 유저입니다.</div>;
    }
    return (
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.description}</p>
            {/* <h3>유저 목록:</h3>
            <ul>
                <li>
                    <Link to="/profiles/artlogy">artlogy</Link>
                </li>
                <li>
                    <Link to="/profiles/ana">ana</Link>
                </li>
            </ul>
            <Routes>
                <Route path="/*" element={<Profile></Profile>}></Route>
            </Routes> */}
        </div>
    );
};

export default Profile;
