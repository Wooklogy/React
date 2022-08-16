<p style="font-size:15px">
이제 동적으로 값을 관리해 인터렉티브한 기능을 만들어보자.
<br>
  리액트 16.8 이후 Hooks 라는 기능이 도입되어 함수형 컴포넌트를 권장하여 쓰게 되었고 함수형 컴포넌트에선 <code>useState</code>를 사용해 주로 값을 관리한다.
 <br /><br>
  간단하게 버튼을 누르면 값이 증가하는 카운터 버튼을 만들어보자.
</p>

#### CounterButton.jsx
```jsx
import React, { useState } from "react";

const CounterButton = () => {
    const [counter, setCounter] = useState(0);
    return (
        <>
            <div>{counter}</div>
            <button
                onClick={() => {
                    setCounter(counter + 1);
                }}
            >
                증가
            </button>
            <button
                onClick={() => {
                    setCounter(counter - 1);
                }}
            >
                감소
            </button>
        </>
    );
};

export default CounterButton;

```
#### App.jsx
```jsx
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
```
![](https://velog.velcdn.com/images/artlogy/post/d248d6a0-27fd-44a9-a64f-8fa295e3fab1/image.gif)
