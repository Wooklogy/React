<div style="font-size:15px">특정 조건에 따라 랜더링을 다르게 해야 할 때가 많다. <br>
그럴땐 리액트에서 다음과 같은 방법으로 조건부 랜더링을 수행한다.</div>

#### App.jsx
```jsx
import React from "react";
import Hello from "./components/Hello";
import Hi from "./components/Hi";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <Wrapper>
            <Hello name="react" isCondition={true} />
            <Hi text="안녕 파랑색" color="blue" />
            <Hi></Hi>
        </Wrapper>
    );
}

export default App;

```

#### Hello.jsx
```jsx
import React from "react";

const Hello = (props) => {
    return (
        <>
            <div>안녕하세요 {props.name}</div>;
            {props.isCondition ? <b>True</b> : null}
        </>
    );
};

export default Hello;
```

<p style="font-size:15px"><code>isCondition</code> 값이 <code>true</code> 라면 <code>&lt;b&gt;True&lt;/b&gt;</code> 를, 그렇지 않다면 <code>null</code> 을 보여주도록 했다. 참고로 JSX 에서 null, false, undefined 를 렌더링하게 된다면 아무것도 나타나지 않게 된다.</p>

## props 값 설정을 생략하면 = {true}

<p style="font-size:15px">컴포넌트의 props 값을 설정하게 될 때 만약 props 이름만 작성하고 값 설정을 생략한다면, 이를 <code>true</code> 로 설정한 것으로 간주한다.
  <br><br>
예를 들자면,</p>

#### App.jsx
```jsx
import React from "react";
import Hello from "./components/Hello";
import Hi from "./components/Hi";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <Wrapper>
            <Hello name="react" isCondition />
            <Hi text="안녕 파랑색" color="blue" />
            <Hi></Hi>
        </Wrapper>
    );
}

export default App;

```
