## 리덕스는 왜 사용하는가?

리덕스는 ContextAPI나 useReducer처럼 상태 관련 로직을 따로 분리시켜 효율적으로 관리하기 위해 나온 라이브러리이다. 때문에 리듀서와 리덕스는 공통적인 개념이 많다.

그럼 useReducer만 사용하면 되는거아냐? 라는 의문이 들텐데 자연스러운 발상이다.
리덕스는 글로벌 상태관리는 물론이고 그 외에 다양한 기능이 있기 때문에 많은 실무에서 사용된다.

### 1. 미들웨어

리덕스에는 미들웨어라는 개념이 존재한다. 리덕스의 미들웨어를 사용하면 액션객체가 리듀서에 의해 처리 되기전에 원하는 작업을 추가 하여 실행 가능하다.
미들웨어는 주로 비동기 작업을 처리 할 때 많이사용한다.

> `useReducer`도 외부라이브러리를 사용해 미들웨어를 사용하지만 많이 쓰는 방식은 아니다.

### 2. 유용한 함수와, Hooks

ContextAPI는 Provider를 설정하고 Context를 편하게 사용하기위해 Custom Hook도 만들어 사용해야하지만 리덕스에서는 이미 이를 위해 만들어진 편리한 기능들이 존재한다.

`connect` 함수를 사용하면 리덕스의 상태 또는 액션 생성 함수를 컴포넌트의 props를 통해 받아 올 수 있으며, `useSelector`, `useDispatch`, `useStore`와 같은 Hooks들을 통해 손쉽게 상태를 조회하거나 액션을 디스패치 할 수 있다.

`Connect`함수와 `useSelector`는 내부적으로 최적화가 잘 이루어져 있어 실제 상태가 바뀔때만 리랜더링 되는데 ContextApi는 지니고 있는 상태가 바뀌면 해당 Context Provider 내부의 컴포넌트가 모두 리랜더링 되기때문에 최적화 측면에서도 리덕스가 유용하다.

### 3. 하나의 커다란 상태 (singleton pattern)

Context Api는 글로벌 상태를 관리 할때 기능별로 Context를 만들어 사용하는게 일반적이지만
리덕스는 모든 글로벌 상태를 하나의 커다란 상태 객체에 넣어서 사용하기 때문에, 매번 Context를 새로 만드는 수고로움을 덜 수 있다.

## 리덕스에서 사용되는 키워드

### 액션(Action)

액션은 상태의 변화가 필요할때, 어떤 상태로 변환 할건지에 대한 정보를 주는 행위를 뜻한다.
이는 하나의 객체로 표현되는데, 액션 객체는 다음과 같이 정의되어 있다.

```jsx
{
    type: "TOGGLE_VALUE";
}
```

`type`필드는 필수적으로 존재해야하고 (상태를 정의하기 때문) 그외에 필드는 개발자가 필요에 따라 추가 할 수 있다.

```jsx
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

### 액션 생성함수 (Action Creator)

액션 생성 함수는 액션을 만드는 함수이다. 단순히 파라미터를 받아와서 액션 객체 형태를 반환한다.

```jsx
export function addTodo(data) {
    return {
        type: "ADD_TODO",
        data,
    };
}

// 화살표 함수로도 만들 수 있습니다.
export const changeInput = (text) => ({
    type: "CHANGE_INPUT",
    text,
});
```

위 처럼 액션 생성함수를 따로 만드는 이유는 컴포넌트에서 쉽게 액션을 발생 시키기 위함이다.
보통 `export` 키워드를 붙여 다른 파일에서 불러와 사용한다.

물론 위처럼 액션생성함수를 정의하지않고 리덕스를 사용해도 상관은없지만
리덕스의 국룰 패턴인 duck패턴에 의하면 위처럼 정의하는게 좋다.

### 리듀서 (Reducer)

리듀서는 변화를 일으키는 함수이다. (액션에 따른 실질적인 기능의 정의를 담당한다.)

```jsx
function counter(state, action) {
    switch (action.type) {
        case "INCREASE":
            return state + 1;
        case "DECREASE":
            return state - 1;
        default:
            return state;
    }
}
```

리덕스를 사용 할 때에는 여러개의 리듀서를 만들고 이를 합쳐서 루트 리듀서를 만들 수 있다.

### 스토어 (Store)

리덕스에서는 한 애플리케이션당 하나의 스토어를 만들게 된다.

### 디스패치(dispatch)

디스패치는 스토어의 내장 함수 중 하나이다. 디스패치는 액션을 발생 시키는 것 이라고 이해하면 됩니다. dispatch라는 함수에는 액션을 파라미터로 전달한다. `dispatch(action)`이러한 형식

이렇게 호출을 하면, 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 형태를 만들어준다.

### 구독 (subscribe)

구독 또한 스토어의 내장함수 중 하나이다. subscribe 함수는, 함수 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다.

## 리덕스 사용하기

```jsx
$ yarn add redux
```

#### store/exercise.js

```js
import { createStore } from "redux";
// createStore는 스토어를 만들어주는 함수이다.
// 리액트 프로젝트에서는 단 하나의 스토어를 만듭니다.

// 리덕스에서 관리 할 상태 정의
const initialState = {
    counter: 0,
    text: "",
    list: [],
};

// 액션 타입 정의
// 액션 타입은 주로 대문자로 작성
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수 정의
// 액션 생성함수는 주로 camelCase로 작성합니다.
export const increase = () => {
    return {
        type: INCREASE,
    };
};

export const decrease = () => ({
    type: DECREASE,
});

export const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
});

export const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
});

// 리듀서 만들기
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수를 만든 것을 리듀서라고 한다
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1,
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1,
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text,
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item),
            };
        default:
            return state;
    }
}

// 스토어 만들기
const store = createStore(reducer);

console.log(store.getState());

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

// store.subscribe(listener)
// store에 subscribe을 실행하면 구독이 가능하며 스토어 안에 상태가 바뀔때마다 실행될 기능을 작성가능하다 (pipe, intercept 개념)
const unsubscripbe = store.subscribe(listener);
// unsubscripbe()
// 구독을 해제하고 싶을 때는 unsubscribe()를 호출하면 된다.

//액션들을 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));
```

하나씩 살펴보자.

```js
// 리덕스에서 관리 할 상태 정의
const initialState = {
    counter: 0,
    text: "",
    list: [],
};
// 액션 타입 정의
// 액션 타입은 주로 대문자로 작성
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";
```

리덕스는 대체로 Ducks패턴을 기반으로 작성한다. (Ducks 패턴은 추후에 자세히 설명하겠다)
먼저 리덕스에서 사용 할 상태를 정의하고 해당 상태가 가질 수 있는 액션을 정의한다.
다른 언어를 해봤다면 액션타입 정의는 상태에 대한 전용 `enum`문이라고 생각하면 좋다.
(물론 js에 enum개념이 없는건 아니다 ㅋ)

```js
// 액션 생성함수 정의
// 액션 생성함수는 주로 camelCase로 작성합니다.
export const increase = () => {
    return {
        type: INCREASE,
    };
};

export const decrease = () => ({
    type: DECREASE,
});

export const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
});

export const addToList = (item) => ({
    type: ADD_TO_LIST,
    item,
});
```

있어도 되고 없어도 되지만 통일성을 위해선 액션생성함수를 만들어주는게 좋다.
액션생성 함수는 `dispatch()` 파라미터로써 사용되며 실질적으로 상태에 대한 액션을 준다.

```js
function reducer(state = initialState, action) {
    // state 의 초깃값을 initialState 로 지정했습니다.
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1,
            };
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1,
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text,
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item),
            };
        default:
            return state;
    }
}
```

리듀서는 액션에따른 실질적인 기능을 정의하는 곳이다.
`useReducer()`에선 default일땐 오류를 주거나 다른 기능작성을 했지만 리덕스에선 꼭 원 상태를 반환해야한다.

```js
const store = createStore(reducer);
```

스토어를 생성하는 구문이다.
근데 여기서 불편한 사람이 있다면 그 사람은 개발자가 천직이다.
분명 내가 위에서 스토어는 어플리케이션당 하나만 존재해야 한다고 했는데
벌써 그 하나를 써버렸다. 솔직히 작디작은 어플리케이션이면 몰라도 규모가 조금이라도 생기면
리듀서 하나로는 부족하다. 여러 리듀서를 정의하고 하나의 스토어에 넣을 수 있는 방법은 조금 있다 설명하니 불편한 자세를 고쳐앉고 조금만 더 읽어보길 바란다.

```jsx
// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다.
```

`listener()`는 커스텀 함수이다. 리덕스엔 구독이라는 개념이 있는데, 백앤드에 `response`개념, 순서만 다른 `middleware`, `intercepter`와 비슷하다. 리덕스의 구독은 어떤 것이 실행되고 그 다음에 무조건 실행되야 할 때 쓰인다. 지금은 스토어안에 상태가 바뀔 때 마다 `console.log`를 찍기 위해 `listener()`함수를 만들어 구독시켰다. 구독을 해제하고싶으면 `unsubscribe()`을 호출하면된다.

> dispatch 호출이 아닌 dispatch호출하여 store안 상태(state)가 바뀔때 호출된다.

```jsx
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));
```

`dispatch()` 개념을 어려워하는 사람이 생각보다 많은데 그냥 `setter`라고 생각하고 쓰면된다. 만약 액션생성함수를 정의하지 않았다면 `dispatch({type:..., action...})`형태로 호출하는게 기본형태이다.

일단은 위 처럼 스토어를 정의했다면 루트 컴포넌트(App.jsx)에서 불러오거나 index.js에서 불러오면 가장 기본적인 형태의 리덕스 생성은 완성이다.

#### App.jsx

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";
import "store/exercise";

const AppPrimaryStyle = {
    palette: {
        primaryColor: "#ff00ff",
        blue: "#228be6",
        gray: "#495057",
        pink: "#f06595",
    },
    layout: {
        maxSizeX: "1200px",
        maxSizeY: "800px",
    },
};

function App() {
    return (
        <>
            <ThemeProvider theme={AppPrimaryStyle}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home></Home>}></Route>
                        <Route path="/about" element={<About></About>}></Route>
                        {/* 서브 라우팅 */}
                        <Route
                            path="/profiles/*"
                            element={<Profiles></Profiles>}
                        ></Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
```

## 리액트 리덕스

지금 까지 실컷 리덕스 설명을 했지만, 리액트에서 리덕스를 사용 할려면 즉 다른 컴포넌트에서 `dispatch()`를 호출할려면 react-redux 라이브러리가 필요하다.

```
$ yarn add react-redux
```

#### App.jsx

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";
import reducer from "store/exercise";
import { Provider } from "react-redux";
import { createStore } from "redux";

const AppPrimaryStyle = {
    palette: {
        primaryColor: "#ff00ff",
        blue: "#228be6",
        gray: "#495057",
        pink: "#f06595",
    },
    layout: {
        maxSizeX: "1200px",
        maxSizeY: "800px",
    },
};

const store = createStore(reducer);

const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscripbe = store.subscribe(listener);

function App() {
    return (
        <>
            <ThemeProvider theme={AppPrimaryStyle}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home></Home>}></Route>
                            <Route
                                path="/about"
                                element={<About></About>}
                            ></Route>
                            {/* 서브 라우팅 */}
                            <Route
                                path="/profiles/*"
                                element={<Profiles></Profiles>}
                            ></Route>
                        </Routes>
                    </BrowserRouter>
                </Provider>
            </ThemeProvider>
        </>
    );
}

export default App;
```

리덕스를 사용할때 `Provider`컴포넌트 내부에 컴포넌트가 있으면 된다.
`store`를 props로 설정하면 리액트에서 리덕스사용을 위한 세팅은 끝이다.

### useSelector & useDispatch

데이터로 우리가 하는 행위는 크게 C(Create), R(Read), U(Update), D(Delete)로 이루어 져있고 여기서 절대 벗어나지 않는다고 과언해도 무리가 없다.
`Store`도 데이터로 상태를 컨트롤하는 저장소이며 CRUD라는 기능에서 벗어나지 않는다.

```jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { changeText, decrease, increase } from "store/exercise";
import Profile from "./Profile";

const Profiles = () => {
    // state 조회 (Read)
    const { counter, text, list } = useSelector((state) => ({
        counter: state.counter,
        text: state.text,
        list: state.list,
    }));
    // CUD는 dispatch를 이용한다.
    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onChangeText = (text) => dispatch(changeText(text));

    useEffect(() => {});
    return (
        <div>
            <h3>유저 목록:</h3>
            <ul>
                <li>
                    <Link to="/profiles/artlogy">artlogy</Link>
                </li>
                <li>
                    <Link to="/profiles/ana">ana</Link>
                </li>
            </ul>
            <button onClick={onIncrease}>상승</button>
            <button onClick={onDecrease}>하락</button>
            <input
                type="text"
                onChange={(e) => {
                    onChangeText(e.target.value);
                }}
            ></input>
            <Routes>
                <Route
                    path="/*"
                    element={<div>유저를 선택해주세요.</div>}
                ></Route>
                <Route path=":username" element={<Profile></Profile>}></Route>
            </Routes>
        </div>
    );
};

export default Profiles;
```

`useSelector`은 상태를 조회하고, `useDispatch`는 상태를 업데이트한다.

> 리덕스는 불변성을 지켜야 하기 때문에 C(생성), D(삭제)는 최대한 자제하거나 처음부터 원본에 추가하는게 좋다.

### useSelector equalityFn

`useSelector()` 또한 반환값을 한개씩 따로 설정해주는게 아닌 이상
위 처럼 새로운 객체를 만들어 할당하면 상태가 바뀌었는지 확인이 되지않아 불필요한 리랜더링이 된다. 때문에 `useSelector()` 두번째 인자인 equalityFn을 넣어 `React.memo`처럼 불필요한 리랜더링을 제어 할 수 있다.

```jsx
equalityFn?: (left: any, right: any) => boolean
```

직접 만들어서 넣어줄수도있고 react-redux의 내장 함수 `shallowEqual`을 사용하면
객체 가장 겉값을 모두 비교해서 리랜더링 여부를 반환하기도 한다.

```jsx
const {someKey, someKey2} = useSelector(..., shallowEqual);
```

## 리덕스 모듈

여러개의 리듀서를 스토어에 넣어 관리 하는법을 알아보자.

#### store/todo

```jsx
/* 액션 타입 선언 */
const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";

/* 액션 생성함수 선언 */
let nextId = 1; // todo 데이터에서 사용 할 고유 id
export const addTodo = (text) => ({
    type: ADD_TODO,
    todo: {
        id: nextId++, // 새 항목을 추가하고 nextId 값에 1을 더해줍니다.
        text,
    },
});
export const toggleTodo = (id) => ({
    type: TOGGLE_TODO,
    id,
});

/* 초기 상태 선언 */
// 리듀서의 초기 상태는 꼭 객체타입일 필요 없습니다.
// 배열이여도 되고, 원시 타입 (숫자, 문자열, 불리언 이여도 상관 없습니다.
const initialState = [
    /* 우리는 다음과 같이 구성된 객체를 이 배열 안에 넣을 것입니다.
  {
    id: 1,
    text: '예시',
    done: false
  } 
  */
];

export default function todos(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat(action.todo);
        case TOGGLE_TODO:
            return state.map(
                (todo) =>
                    todo.id === action.id // id 가 일치하면
                        ? { ...todo, done: !todo.done } // done 값을 반전시키고
                        : todo // 아니라면 그대로 둠
            );
        default:
            return state;
    }
}
```

리덕스로 관리 할 상태를 하나 더 만들었다.

### 루트 리듀서

#### store/index.js

```js
import { combineReducers } from "redux";
import reducer from "./exercise";
import todos from "./todo";

const rootReducer = combineReducers({
    reducer,
    todos,
});

export default rootReducer;
```

redux에 `combineReducers()`를 통해 여러개의 리듀서를 하나의 리듀서에 합쳐서 담고

```js
const store = createStore(rootReducer);
```

루트 리듀서를 파라미터로 스토어를 만들어주면 끝이다.

이제 구독을 통해 스토어의 상태를 조회하면 다음과 같이 나타나게 된다.
![](https://velog.velcdn.com/images/artlogy/post/586b0730-af03-4057-9822-591e1e94b007/image.png)

## 리덕스 언제 사용하면 좋을까?

    1. 데이터가 다양한 컴포넌트에서 사용되는 경우
    	-리덕스에서 한번만 로드하는게 컴포넌트마다 로드하는 것 보다 최적화 측면에서 유리하다.
    2. 상태에 대한 기능을 철저히 공통화하고 제한 해야 할 때
    	-컴포넌트로도 가능하지만, 리덕스로 하는게 유지보수에 유리하다.
    3. contextApi, useReducer에 없는 기능을 사용하고 싶을때
    	- 다음 강의에 계속..
