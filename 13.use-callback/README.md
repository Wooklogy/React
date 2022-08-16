<p style="font-size:15px">
  <code>useCallback</code>는 <code>useMemo</code>와 비슷한 Hook이다.<br>
  리액트에선 컴포넌트가 리렌더링 될 때마다. 컴포넌트안에 변수는 물론 함수까지 새로 만들어진다. 때문에 한번 만든 함수를 필요할때만 새로 만들고 재사용하면서 최적화하는 것도 중요하다.<br><br>
  이전에 만든 <code>onCreate</code>,<code>onRemove</code>,<code>onToggle</code>함수를 <code>useCallback</code>을 이용해 최적화 해보자.
</p>

#### Array.jsx

```jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";

function User({ user, onRemove, onToggle }) {
    return (
        <div>
            {user.active ? (
                <b
                    onClick={() => {
                        onToggle(user.id);
                    }}
                    style={{ color: "green" }}
                >
                    {user.username}
                </b>
            ) : (
                <b
                    onClick={() => {
                        onToggle(user.id);
                    }}
                >
                    {user.username}
                </b>
            )}
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
}
const Array = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "차가운 그녀",
            email: "cold_fish@gmail.com",
            active: true,
        },
        {
            id: 2,
            username: "기네스 맥주",
            email: "guness@gmail.com",
            active: false,
        },
        {
            id: 3,
            username: "나를잡아줘",
            email: "holdme@gmail.com",
            active: false,
        },
    ]);
    function countActiveUsers(users) {
        console.log("활성 사용자 수를 세는중...");
        return users.filter((user) => user.active).length;
    }
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
    });
    const onChange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setInputs({ ...inputs, [name]: value });
        },
        [inputs]
    );

    const count = useMemo(() => {
        return countActiveUsers(users);
    }, [users]);
    const onCreate = useCallback(() => {
        // spread를 이용한 방법
        setUsers([
            ...users,
            {
                id: users.length + 1,
                email: inputs.email,
                username: inputs.name,
                active: false,
            },
        ]);
        //concat을 이용한 방법
        setUsers(
            users.concat({
                id: users.length + 1,
                email: inputs.email,
                username: inputs.name,
                active: false,
            })
        );
    }, [users, inputs.email, inputs.name]);
    const onRemove = useCallback(
        (id) => {
            // 해당 id(key)를 제외한 배열로 반환
            setUsers(users.filter((el) => el.id !== id));
        },
        [users]
    );
    const onToggle = useCallback(
        (id) => {
            setUsers(
                users.map((el) =>
                    el.id === id ? { ...el, active: !el.active } : el
                )
            );
        },
        [users]
    );
    return (
        <>
            <input
                name={"email"}
                placeholder="이메일"
                onChange={onChange}
            ></input>
            <input name={"name"} placeholder="이름" onChange={onChange}></input>
            <button onClick={onCreate}>등록</button>
            {users.map((el, idx) => (
                <>
                    <User
                        key={el.id}
                        user={el}
                        onRemove={onRemove}
                        onToggle={onToggle}
                    ></User>
                </>
            ))}
            <div>활성사용자 수 :{count}</div>
        </>
    );
};

export default Array;
```

> <p style="font-size:15px">⚠️ Callback 함수안에 <code>state</code>혹은 <code>props</code>가 있다면 꼭 <code>deps</code>에 포함하여야 합니다.</p>
