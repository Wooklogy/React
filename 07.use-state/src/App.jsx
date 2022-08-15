import React from "react";
import CounterButton from "./components/CounterButton";
import Hello from "./components/Hello";
import Hi from "./components/Hi";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <Wrapper>
            <Hello name="react" isCondition />
            <Hi text="안녕 파랑색" color="blue" />
            <Hi></Hi>
            <CounterButton></CounterButton>
        </Wrapper>
    );
}

export default App;
