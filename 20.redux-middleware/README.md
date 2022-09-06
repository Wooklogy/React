# Redux Middleware

리덕스 미들웨어는 리덕스가 지니고 있는 핵심 기능이다. contextAPI, MobX를 사용하는 것과 차별화가 되는 부분이다.
![](https://velog.velcdn.com/images/artlogy/post/dd55e739-ca55-4dfd-a291-4021398f688b/image.png)

## 리덕스 모듈 준비

#### store/counter.js

```js
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
```

루트 리듀서에 추가한다.

## 리덕스 미들웨어 템플릿

리덕스 미들웨어를 만들 땐 다음과 같은 [템플릿](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware)을 사용한다.

```jsx
const middleware = (store) => (next) => (action) => {
    //하고 싶은 작업
};
```

미들웨어도 결국 함수이다. 함수를 두번 연달아 리턴하는 함수라서 이게 뭐지 싶을텐데
`function`키워드로 풀어쓰면 다음과 같은 코드이다.

```jsx
function middleware(store) {
    return function (next) {
        return function (action) {
            //하고싶은 작업
        };
    };
}
```

이제 각 함수의 파라미터를 하나씩 알아보겠다.
`store`는 리덕스 스토어 인스턴트이다. 이 안엔 `dispatch`,`getState`,`subscribe`등 우리가 기존에 쓰던 스토어 내장함수가 들어있다.

두번째 `next`는 액션을 다음 미들웨어에 전달하는 함수이다. `next(action)`이런 형태로 사용하고, 만약 다음 미들웨어가 없다면 리듀서에게 액션을 전달해준다. 추가로 `next`를 호출하지 않으면 액션이 무시처리되어 리듀서에 전달되지 않는다.

세번째 `action`은 현재 처리하고있는 액션객체이다.
![](https://velog.velcdn.com/images/artlogy/post/42e60eef-a1e5-4012-9940-5a3a24ce29a3/image.png)
미들웨어는 위와 같이 작동한다. 리덕스 스토어에는 원하는 만큼의 미들웨어를 등록 할 수 있고
새로운 액션이 디스패치되면 처음 등록한 미들웨어를 시작으로 순차적으로 `next(action)`에 의해 전달된다. 만약 미들웨어에서 `store.dispatch`를 사용하면 다른 액션을 추가로 발생시킬수도있다.

### 테스트 미들웨어 작성

#### middlewares/myLogger.js

```jsx
const myActionLogger = (store) => (next) => (action) => {
    console.log(action); //액션출력
    const result = next(action); //다음 미들웨어 또는 리듀서에 액션 전달
    return result;
};
export default myActionLogger;
```

### 테스트 미들웨어 적용

#### App.js

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";
import rootReducer from "store/index";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import actionLogger from "src/store/middlewares/log";
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

//미들웨어 적용 applyMiddleware()
const store = createStore(rootReducer, applyMiddleware(actionLogger));

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

미들웨어를 추가할땐 `createStore` 두번째 인자부터 `applyMiddleware()`를 넣어주면 된다.
![](https://velog.velcdn.com/images/artlogy/post/86fc2df3-cac5-43d4-be52-bb96ffc2d137/image.png)

### 미들웨어 수정하기

액션이 리듀서까지 전달되고 난 후 새로운 상태를 확인하고싶다면 다음과 같이 수정 할 수 있다.

```jsx
const actionLogger = (store) => (next) => (action) => {
    console.log(action);
    const result = next(action);
    // 업데이트 이후의 상태를 조회
    console.log("\t", store.getState());
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과. 기본: undefined
};

export default actionLogger;
```

![](https://velog.velcdn.com/images/artlogy/post/fa790909-38a1-4123-b365-f27774274eb1/image.png)

미들웨어 안에선 무엇이든 할 수 있다.
예를들어 액션 값을 객체가 아닌 함수로 받았을땐 이를 실행 시키게끔 할 수도있다.

```jsx
const thunk = (store) => (next) => (action) =>
    typeof action === "function"
        ? action(store.dispatch, store.getState)
        : next(action);
```

dispatch할때 함수를 넣어 다음처럼 한번에 action을 줄 수 도있다.

```jsx
const myThunk = () => (dispatch, getState) => {
    dispatch({ type: "HELLO" });
    dispatch({ type: "BYE" });
};

dispatch(myThunk());
```

## Redux-logger

리덕스에는 log를 띄워주는 미들웨어 라이브러리가 존재한다.

### redux-logger 사용

[redux-logger](https://github.com/LogRocket/redux-logger)를 설치해준다.

```
$ npx add redux-logger
```

그 후 다음과 같이 import하여 `logger` 미들웨어를 추가해준다.

#### App.jsx

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";
import rootReducer from "store/index";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
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

const store = createStore(rootReducer, applyMiddleware(logger));

const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscripbe = store.subscribe(listener);
unsubscripbe();
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

![](https://velog.velcdn.com/images/artlogy/post/705c969e-0cba-476c-a20e-637c264d6f0c/image.png)
후 `dispatch`를 해보면 위 처럼 잘 적용된것을 확인 할 수 있다.

## Redux DevTools 사용

이번엔 redux전용 콘솔을 띄울수있는 Redux DevTools를 써보자.
크롬 앱에서 [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ko)를 다운해준다.

다운이 완료되었으면 프로젝트에 적용해준다.

```
$ yarn add redux-devtools-extension
```

```jsx
const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(logger))
);
```

`createStore()` 두번째 파라미터에 `composeWithDevTools()`를 넣고 미들웨어를 추가해주면 된다.

![](https://velog.velcdn.com/images/artlogy/post/f8882092-d7dd-4368-9c15-036468c78344/image.png)
개발 도구 탭에 `Redux`가 생성되었다면 성공이다.
이제 redux관련 기능엔 `console.log()`를 굳이 추가하지 않아도 된다.

## Redux-thunk

redux-thunk는 리덕스에서 비동기 작업을 처리 할 때 가장많이 사용하는 미들웨어이다.
이 미들웨어를 사용하면 **액션 객체가 아닌 함수를 디스패치 할 수 있다.**
물론 다음 처럼 직접 함수를 디스패치 할 수 있게 만들수도있다.

```jsx
const thunk = (store) => (next) => (action) =>
    typeof action === "function"
        ? action(store.dispatch, store.getState)
        : next(action);
```

함수를 디스패치 할 땐 무조건 해당 함수에 `dispatch`와 `getState`를 파라미터로 받아와야한다. 위 처럼 함수를 디스패치 할 수있게 해주는 미들웨어를 만들어주는 라이브러리가 thunk이다.

### redux-thunk 설치 및 적용

```
$ yarn add redux-thunk
```

#### App.jsx

```jsx
...
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
...
const store = createStore(
    rootReducer,
  //redux-logger를 사용하는 경우 logger가 가장 마지막에 있어야 한다.
  //(어찌보면 당연한 이야기다.)
    composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);
```

이제 함수를 디스패치의 파라미터를 넣어서 처리가능해졌다.

## Redux-saga

redux-saga는 액션을 모니터링 하다가 특정 액션이 발생하면, 특정 작업을 진행하는 방식을 정의할 때 자주 사용하는 라이브러리이다.

redux-saga는 기본적으로 [Generator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator)문법을 사용한다. 이 문법을 이해하지 못하면 redux-saga를 배울 수 없으니 간단하게 설명하고 가겠다.

### Generator

이 문법의 핵심은 함수를 작성 할 때 특정 구간에 멈춰놓거나 다시 돌려보내거나 결과값을 여러번 반환 할 수 있다는 점이다.

예를 들어 다음과 같은 함수가 있다고 가정하자.

```jsx
const stdFunc = () => {
    return 1;
    return 2;
    return 3;
};
```

위 함수는 몇번을 호출하던 1을 반환 할 것이다. `return`이 된 순간 함수를 빠져나가기 때문이다. 하지만 제너레이터 함수를 이용하면 값을 순차적으로 반환이 가능하다.

크롬 관리자도구 콘솔에서 다음과 같이 제너레이터함수를 만들어보자.

```jsx
function* generatorFunc() {
    console.log("첫번째");
    yield 1;
    console.log("두번째");
    yield 2;
    console.log("세번째");
    yield 3;
    console.log("네번째");
    yield 4;
}
```

제너레이터 함수를 만들땐 `function*`이라는 키워드를 사용한다.

함수를 작성하고 호출 할땐 다음과 같이 한다.

```jsx
const generator = generatorFunc();
generator.next(); //1 "첫번째"
generator.next(); //2 "두번째"
generator.next(); //3 "두번째"
generator.next(); //4 "두번째"
```

일반 함수처럼 호출했다고 실행되는 것이아닌 `next()`라는 내부함수를 통해 순차적으로 실행된다.

### redux-saga 설치 및 비동기 카운터 만들기

```jsx
$ yarn add redux-saga
```

#### store/counter.js

```js
import { delay, put } from "redux-saga/effects";

// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

function* increaseSaga() {
    yield delay(1000); // 1초 대기.
    yield put(increase()); // put은 특정 액션을 디스패치.
}
function* decreaseSaga() {
    yield delay(1000); // 1초 대기
    yield put(decrease()); // put은 특정 액션을 디스패치.
}

export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga); // 모든 INCREASE_ASYNC 액션을 처리
    yield takeLatest(DECREASE_ASYNC, decreaseSaga); // 가장 마지막으로 디스패치된 DECREASE_ASYNC 액션만을 처리
}

// 초깃값
const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
```

'redux-saga/effects'에는 다양한 유틸함수가 있다. 여기서 사용한 `put`은 `dispatch`와 똑같이 새로운 액션을 디스패치해준다. `takeEvery`는 특정 액션타입에 대하여 디스패치되는 모든 액션들을 처리하는 것이다.`takeLatest`는 특정 액션타입에 대하여 디스패치된 가장 마지막 액션만을 처리하는 함수이다.

이제 여러 리덕스 사가를 관리 할 루트사가를 만든다.

#### store/index.js

```js
import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import { counterSaga } from "./counter";
import reducer from "./exercise";
import todos from "./todo";

const rootReducer = combineReducers({
    reducer,
    todos,
});

export function* rootSaga() {
    yield all([counterSaga]); // all은 배열안에 여러 사가를 동시에 실행시켜준다.
}
export default rootReducer;
```

#### App.jsx

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";
import rootReducer from "store/index";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
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

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk, sagaMiddleware, logger))
);

const listener = () => {
    const state = store.getState();
    console.log(state);
};

const unsubscripbe = store.subscribe(listener);
unsubscripbe();
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
