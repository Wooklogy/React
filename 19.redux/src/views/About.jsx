import React from "react";
import { useSearchParams } from "react-router-dom";

const About = () => {
    const [queryData] = useSearchParams();
    console.log(queryData.get("detail"));
    return (
        <div>
            <h1>소개</h1>
            <p>소개합니다</p>
        </div>
    );
};

export default About;
