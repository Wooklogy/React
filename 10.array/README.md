<p style="font-size:15px">
  Js에서 특정 Dom을 사용할땐, <code>querySelector</code> 혹은 <code>getElementById</code>등의 Dom 선택자를 이용했다.
  <br>위 처럼 리액트 환경에선 Dom을 직접 선택하여 컨트롤 할땐 <code>useRef</code>를 사용한다. 
</p>

#### InputSample.jsx

```jsx
import React, { useRef, useState } from "react";

const InputSample = () => {
    const [inputs, setInputs] = useState({
        name: "",
        nickname: "",
        text: "",
    });

    const nameInput = useRef(); //ref 선언

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
        nameInput.current.focus(); //.current는 ref가 가르키는 dom 요소를 뜻한다.
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <input
                name="name"
                ref={nameInput} //ref로 가르킬 요소를 지정해준다.
                placeholder="이름"
                onChange={onChange}
            ></input>
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

<p style="font-size:15px">
1. <code> useRef()</code>를 통해 Ref객체를 만든다.<br />
  2. 원하는 Dom 요소에 <code>ref</code>값을 설정해준다.<br />
  3. Ref 객체의 <code>.current</code>를 통해 접근하여 사용한다.
</p>
 <br>
 
<h2>useRef안의 기본값 사용하기</h2>
<p style="font-size:15px">
  <code>ref</code>를 선언하기전 기본값을 설정 할 수 있다.
</p>

```jsx
import React, { useRef, useState } from "react";

const InputSample = () => {
    const [inputs, setInputs] = useState({
        name: "",
        nickname: "",
        text: "",
    });

    const nameInput = useRef(0); //ref 선언()안에는 useState처럼 기본값을 할당하면 된다.

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
        // nameInput.current.focus(); //.current는 ref가 가르키는 dom 요소를 뜻한다.
        nameInput.current += 1; //변수를 CRUD할때도 이렇게 접근하면된다.
        console.log(nameInput.current);
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

<p style="font-size:15px">
  당연하지만 <code>useRef</code>객체에 dom을 지정해주면 설정한 기본값은 덮어씌워진다.</p>
