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
        nameInput.current.focus(); //.current는 ref가 가르키는 dom 요소를 뜻한다.
        nameInput.current += 1; //변수를 CRUD할때도 이렇게 접근하면된다.
        console.log(nameInput.current);
    };
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <input
                name="name"
                ref={nameInput}
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
