## useMemo 개요

#### Array.jsx

```jsx
import React, { useEffect, useState } from "react";

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
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    const count = countActiveUsers(users);
    const onCreate = () => {
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
    };
    const onRemove = (id) => {
        // 해당 id(key)를 제외한 배열로 반환
        setUsers(users.filter((el) => el.id !== id));
    };
    const onToggle = (id) => {
        setUsers(
            users.map((el) =>
                el.id === id ? { ...el, active: !el.active } : el
            )
        );
    };
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

<pre style="font-size:15px">
위 코드를 실행시킨 후 
입력을 하면서 콘솔창을 살펴보면 입력을 할 때마다.
로그가 찍히는 걸 확인 할 수 있다.
</pre>

![](https://velog.velcdn.com/images/artlogy/post/811b7df7-ba17-4378-9b84-1761069c5820/image.png)

<pre style="font-size:15px">
위와 같은 결과가 나오는 이유는 랜더링되는 count가 값은 그대로지만 
input값이 바뀌기 때문에 계속 업데이트가 된다. 
때문에 값이 바뀌지 않는 다면 최적화를 위해 업데이트를 제어해줄 필요가 있다.
</pre>

#### Array.jsx

```jsx
...
...
    const count = useMemo(() => {
        return countActiveUsers(users);
    }, [users]);
...
...
```

<p style="font-size:15px">
첫 번째 파라미터엔 연산을 정의하는 함수를 넣어주면되고<br>
두번째 파라미터엔 <code>deps</code>배열을 넣어주면된다.
return 되는 값이 바뀌면 업데이트하고 바뀌지 않으면 그대로 사용하게 된다.
</p>
