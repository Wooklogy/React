<p style="font-size:15px">
  이번에는 사용자의 입력을 받는 <code>input</code> 태그의 상태를 관리해보자.
</p>

#### InputSample.jsx

```jsx
import React, { useState } from "react";

const InputSample = () => {
    const [text, setText] = useState("");

    return (
        <div>
            <input
                onChange={(e) => {
                    setText(e.target.value);
                }}
            ></input>
            <button
                onClick={() => {
                    setText("");
                }}
            >
                초기화
            </button>
            <div>
                <b>값 : {text}</b>
            </div>
        </div>
    );
};
export default InputSample;
```

#### App.jsx

```jsx
import React from "react";
import CounterButton from "./components/CounterButton";
import Hello from "./components/Hello";
import Hi from "./components/Hi";
import Wrapper from "./components/Wrapper";
import InputSample from "./components/InputSample";

function App() {
    return (
        <Wrapper>
            <Hello name="react" isCondition />
            <Hi text="안녕 파랑색" color="blue" />
            <Hi></Hi>
            <CounterButton></CounterButton>
            <InputSample></InputSample>
        </Wrapper>
    );
}

export default App;
```

![](https://velog.velcdn.com/images/artlogy/post/07216ec9-21dc-43cf-bd7d-fe3fb8781cdf/image.gif)

## 여러개의 input 상태 관리

<p style="font-size:15px">
	위 예시처럼 하나의 input만 관리한다면 설명 할 것도 없이 간단하겠지만,
  <br>대부분 페이지는 여러개의 input을 사용하기 때문에<br> 여러개의 input들의 상태를 효율 적으로 관리하는 법을 숙지 할 필요가있다.
</p>

#### InputSample.jsx

```jsx
import React, { useState } from "react";

const InputSample = () => {
    const [inputs, setInputs] = useState({
        name: "",
        nickname: "",
        text: "",
    });
    const { name, nickname, text } = inputs; // 비구조화 할당을 통해 값 추출
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs, //기존 input 객체를 복사
            [name]: value, //name 키를 가진 값을 value로 설정
        });
    };

    const onReset = () => {
        setInputs({
            name: "",
            nickname: "",
        });
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <input name="name" placeholder="이름" onChange={onChange}></input>
            <input
                name="nickname"
                placeholder="닉네임"
                onChange={onChange}
            ></input>
            <input name="text" onChange={onChange}></input>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값 : {text}</b>
                <div>
                    {name} : {nickname}
                </div>
            </div>
        </div>
    );
};
export default InputSample;
```

![](https://velog.velcdn.com/images/artlogy/post/93ef9ea2-7b32-49cc-8cdb-84ba41729a00/image.png)
