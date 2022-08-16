## 마운트/언마운트

<p style="font-size:15px">컴포넌트가 화면에 랜더 될 때(마운트 될 때), 화면에서 사라질때 (언마운트)될 때는 다음과 같이 useEffect를 이용한다.</p>

```jsx
useEffect(() => {
    console.log("컴포넌트가 화면에 랜더됌");
    return () => {
        console.log("컴포넌트가 화면에서 사라짐");
    };
}, []);
```

## deps 업데이트

<p style="font-size:15px">마운트/언마운트를 포함하고 특정 값이 바뀔때 업데이트를 관리 하고 싶을땐 다음과 같이 설정한다.</p>

#### Array.jsx

```jsx
import React, { useEffect, useState } from "react";

function User({ user, onRemove, onToggle }) {
    useEffect(() => {
        console.log("user 값이 설정됨");
        console.log(user);
        return () => {
            console.log("user 가 바뀌기 전..");
            console.log(user);
        };
    }, [user]);

...생략
```

> <code>useEffect</code>에 2번째 파라미터 배열은 의존값이 들어있는 <code>deps</code>라고 한다.

### deps 파라미터를 생략하기

<p style="font-size:15px"><code>deps</code> 파라미터를 생략한다면, 컴포넌트가 리렌더링 될 때마다 호출이 된다.</p>

#### Array.jsx

```jsx
function User({ user, onRemove, onToggle }) {
  useEffect(() => {
    console.log(user);
  });
  ...생략
```

> 리액트는 기본적으로 부모 컴포넌트가 리랜더링 되면 자식 컴포넌트도 리랜더링이 된다.
> useMemo를 통해 이 또한 컨트롤 할 수 있다.
