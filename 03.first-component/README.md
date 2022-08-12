[이전 포스팅](https://github.com/artlogy/React/tree/main/02.hello-react)에서 만든 프로젝트에 src 디렉터리에 Hello.js라는 파일을 만든 후 다음과 같이 작성해보자.

### Hello.js
```jsx
import React from 'react';

function Hello() {
  return <div>Hello React!!!</div>
}

export default Hello;
```

<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">가장 기본적인 형태의 리액트 컴포넌트를 만들었다.

하나씩 차근차근 살펴보자.</div>

#### 리액트 불러오기
```jsx
import React from 'react';
```
<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">이름처럼 리액트 그 자체이다. 
리액트를 불러오겠다는 뜻으로 리액트 관련한 요소를 만들땐 무조건 선행 하는 코드이다.</div>

#### JSX
```jsx
function Hello() {
  return <div>Hello React!!!</div>
}
```
<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">함수의 리턴값으로 XML형식을 보내고 있다.
이를 리액트에서 JSX 코드라고 한다. JSX에 대해선 다음 포스팅에서 자세히 다룰예정이니
일단은 화면에 렌더링 되는 요소 및 기능을 작성한다~ 정도로 알고있으면 좋다.</div>

#### 컴포넌트 내보내기
```jsx
export defaut Hello		//내보낼때 기본값이 되는 컴포넌트 선언
export Hello			//그냥 내보내기
```
<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">다른 컴포넌트에서 Hello컴포넌트를 쓰고싶다면 위 처럼 선언하면된다.</div>


### App.js
```jsx
import "./App.css";
import Hello from "./Hello";		//or import Hello;
function App() {
    return (
        <div className="App">
            <Hello></Hello>
            {/* 또는 <Hello />*/}
        </div>
    );
}

export default App;

```
> 상단에 있던 
import logo from './logo.svg';
import './App.css';
SVG 파일을 불러오고, CSS 를 적용하는 코드인데 현재 필요없어서 제거하였습니다.

![](https://velog.velcdn.com/images/artlogy/post/715a8f6e-09b7-4323-924c-3460f348fbfe/image.png)
<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">컴포넌트는 캡슐화된 블럭이라고 생각하면 된다.
재사용 또한 쉽기때문에 컴포넌트를 작성할땐 항상 재사용성을 생각하면서 작성하자.</div>

```jsx
import "./App.css";
import Hello from "./Hello";
function App() {
    return (
        <div className="App">
            <Hello></Hello>
            <Hello></Hello>
            <Hello></Hello>
            <Hello></Hello>
            <Hello></Hello>
            {/* 또는 <Hello />*/}
        </div>
    );
}

export default App;
```

![](https://velog.velcdn.com/images/artlogy/post/85495b01-d051-47cc-906c-4df7dab47190/image.png)

<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">이제 여기서 JS(TS)로만 웹을 만드신분들은 의문이 들것이다.
 <br>
"내가 작성한건 함수안 XML(JSX)내용뿐인데 어느 요소에서 랜더링 되는거지?"
<br/>
  <br/>
  위 물음에 답하기위해 관리자 개발도구를 이용해 살펴보자. <b>( 단축키 : F12 )</b>
</div>


![](https://velog.velcdn.com/images/artlogy/post/7cb86eab-bc79-4618-bad3-280a9c56e372/image.png) <div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">관리자 개발도구를 살펴보면 "div id=root" 하위에 내가 작성한 컴포넌트들이 옹기종기 모여있는 것을 확인 할 수 있다.
  이제 src디렉터리에 <b>index.js</b>를 열어보자.
</div>

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
<div style="font-size:15px; border-top:1px solid lightgray; padding-top:16px">여기서 ReactDOM.render 의 역할은 브라우저에 있는 실제 DOM 내부에 리액트 컴포넌트를 렌더링하겠다는 것을 의미한다. <br>이 DOM은 Public/index.html에 있다.</div>

> React는 SPA(Single Page Application)형태이기 때문에 html은 index.html하나만 있어도 된다.
