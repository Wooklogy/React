## 배열 랜더링 하기
<p style="font-size:15px">
아래와 같은 배열 데이터를 랜더링 해보자.
</p>

#### Array.jsx 
```jsx
import React from "react";

const users = [
    {
        id: 1,
        username: "차가운 그녀",
        email: "cold_fish@gmail.com",
    },
    {
        id: 2,
        username: "기네스 맥주",
        email: "guness@gmail.com",
    },
    {
        id: 3,
        username: "나를잡아줘",
        email: "holdme@gmail.com",
    },
];

const Array = () => {
    return <></>;
};

export default Array;

```


<p style="font-size:15px">
jsx에서 js값을 랜더할땐 {}안에 넣어야 한다는걸 우린 안다.<br>
 여기서 추가적으로 {}안에 객체는 해당 객체가 가진 내장함수를 이용 할 수 있다. 
  <br/>
  <b>(엄밀히 말하면 return이 있는 함수 및 연산자를 활용 할 수 있다.)</b>
  <br/>
  <br/>
  예를 들면 다음과 같다.
</p> 

```jsx
const Array = () => {
    return (
        <>
            {users.map((el, idx) => (
                <>
                    <div>ID : {el.id}</div>
                    <div>{el.email}</div>
                    <div>{el.username}</div>
                </>
            ))}
        </>
    );
};
```

#### App.jsx
```jsx
import React from "react";
import Array from "./components/Array";

function App() {
    return (
        <>
            <Array />
        </>
    );
}

export default App;
```

![](https://velog.velcdn.com/images/artlogy/post/26ba581e-3861-4edd-9455-6b2c7d2250b8/image.png)
<p style="font-size:15px">배열은 잘 랜더링 되나 콘솔을 보면 오류가 떠 있는걸 볼 수 있다.<br>
해당 오류는 배열에 unique한 key값을 주지 않았을때 나타난다. <br>
key값은 나중에 배열 요소에 값을 실시간으로 수정 할 때 수정 할 배열 요소에 접근하기 위한 가이드로 사용된다.
</p>

#### Array.jsx

```jsx
import React from "react";

const users = [
    {
        id: 1,
        username: "차가운 그녀",
        email: "cold_fish@gmail.com",
    },
    {
        id: 2,
        username: "기네스 맥주",
        email: "guness@gmail.com",
    },
    {
        id: 3,
        username: "나를잡아줘",
        email: "holdme@gmail.com",
    },
];
function User({ user }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}
const Array = () => {
    return (
        <>
            {users.map((el, idx) => (
                <>
                    <User key={el.id} user={el}></User>
                </>
            ))}
        </>
    );
};

export default Array;
```

## Key의 존재유무에 따른 업데이트
<p style="font-size:15px">
예를 들어 다음 처럼 배열을 랜더링 한다고 가정해보자.
</p>

```js
const array = ['a', 'b', 'c', 'd'];
array.map(item => <div>{item}</div>);
```
<p style="font-size:15px">
  위 배열의 b 와 c 사이에 z 를 삽입하게 된다면, 리렌더링을 하게 될 때 <code>&ltdiv&gtb&lt/div&gt</code> 와 <code>&ltdiv&gtc&lt/div&gt</code> 사이에 새 <code>div</code> 태그를 삽입을 하게 되는 것이 아니라, 기존의 c 가 z 로바뀌고, d 는 c 로 바뀌고, 맨 마지막에 d 가 새로 삽입된다.
</p>

![](https://velog.velcdn.com/images/artlogy/post/a573aaab-b59b-459d-8561-a095170851bf/image.gif)

<p style="font-size:15px">
배열에 인덱스를 셔플하는 방식으로 굉장히 비효율 적이다.<br>
  또한 <code>map</code>에서 <code>key</code>가 없으면 중간값이 변하면 그 이후 값도 같이 변하기 때문에 원하는 랜더링이 되지 않는다.<br>
  때문에 리액트에선 <code>key</code>라는 고유 값을 주어 다음과 같이 처리한다.
</p>

![](https://velog.velcdn.com/images/artlogy/post/b524e9c0-b37b-44ce-aae7-3e1a826d6506/image.gif)

## 배열에 항목 추가하기

<p style="font-size:15px">
이미 랜더링 되고 있는 배열에 변화를 줄 때엔 불변성을 지켜줘야 하기 <br/>때문에
  <code>push</code>,<code>splice</code>등의 함수를 사용하면 안된다.
  </br>
  배열에 불변성을 지키며 추가하는 방법은 <code>spread</code>, <code>concat</code>이 있다.
</p>

#### Array.jsx
```jsx
import React, { useState } from "react";

function User({ user }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
        </div>
    );
}
const Array = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "차가운 그녀",
            email: "cold_fish@gmail.com",
        },
        {
            id: 2,
            username: "기네스 맥주",
            email: "guness@gmail.com",
        },
        {
            id: 3,
            username: "나를잡아줘",
            email: "holdme@gmail.com",
        },
    ]);
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
    });
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    const onCreate = () => {
        // spread를 이용한 방법
        setUsers([
            ...users,
            {
                id: users.length + 1,
                email: inputs.email,
                username: inputs.name,
            },
        ]);
        //concat을 이용한 방법
        setUsers(
            users.concat({
                id: users.length + 1,
                email: inputs.email,
                username: inputs.name,
            })
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
                    <User key={el.id} user={el}></User>
                </>
            ))}
        </>
    );
};

export default Array;

```
## 배열에 항목 삭제하기
<p style="font-size:15px">
  항목 삭제는 <code>key</code>값을 이용해 <code>.filter</code>로 많이 처리한다.</p>

#### Array.jsx

```jsx
import React, { useState } from "react";

function User({ user, onRemove }) {
    return (
        <div>
            <b>{user.username}</b> <span>({user.email})</span>
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
        },
        {
            id: 2,
            username: "기네스 맥주",
            email: "guness@gmail.com",
        },
        {
            id: 3,
            username: "나를잡아줘",
            email: "holdme@gmail.com",
        },
    ]);
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
    });
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
    const onCreate = () => {
        // spread를 이용한 방법
        setUsers([
            ...users,
            {
                id: users.length + 1,
                email: inputs.email,
                username: inputs.name,
            },
        ]);
        //concat을 이용한 방법
        setUsers(
            users.concat({
                id: users.length + 1,
                email: inputs.email,
                username: inputs.name,
            })
        );
    };
    const onRemove = (id) => {
        // 해당 id(key)를 제외한 배열로 반환
        setUsers(users.filter((el) => el.id !== id));
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
                    <User key={el.id} user={el} onRemove={onRemove}></User>
                </>
            ))}
        </>
    );
};

export default Array;
```

## 배열 항목 수정하기

<p style="font-size:15px">
  항목 수정은 <code>key</code>값을 이용해 접근하여 수정된 배열을 리랜더링 하는 방법으로 많이 구현한다. </p>

#### Array.jsx
```jsx
import React, { useState } from "react";

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
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
    });
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({ ...inputs, [name]: value });
    };
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
      //선택한 id를 가진 요소를 수정한 배열을 반환하여 셋팅
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
        </>
    );
};

export default Array;

```