## 컴포넌트에 값을 전달해보자.

#### App.jsx
```jsx
import React from 'react';
import Hello from "components/Hello";

function App() {
  return (
    <Hello name="react" />
  );
}

export default App;
```

#### Hello.jsx

```jsx
import React from 'react';

const Hello = (props)=> {
  return <div>안녕하세요 {props.name}</div>
}

export default Hello;
```

<div style="font-size:15px">
	컴포넌트에 전달되는 props는 파라미터를 통해 조회 할 수 있다.
  props는 object형식으로 전달되며,<br /> 만약 <span style="background-color:lightgray; padding:2px 4px">name</span> 값을 조회하고 싶다면 <span style="background-color:lightgray; padding:2px 4px">props.name</span> 을 조회하면 된다.
</div>


## 비구조화 할당 (구조 분해)
#### Hi.jsx
```jsx
import React from "react";

const Hi = ({ color, text }) => {
    return <div style={{ color: color }}>{text}</div>;
};

export default Hi;
```
#### App.jsx
```jsx
import React from "react";
import Hello from "./components/Hello";
import Hi from "./components/Hi";

function App() {
    return (
        <>
            <Hello name="react" />
            <Hi text="안녕 파랑색" color="blue" />
        </>
    );
}

export default App;
```

![](https://velog.velcdn.com/images/artlogy/post/e220b813-fa6d-4d95-afce-26770fa5ee9e/image.png)

## defaultProps (기본값 설정)
<div style="font-size:15px">컴포넌트에 props 값을 지정하지 않았을떄 사용될 기본 값을 설정할땐 <span style="background-color:lightgray; padding:2px 4px">defaultProps</span>를 사용하면 된다.</div>

#### Hello.jsx
```jsx
import React from 'react';

const Hi = ({ color, name }) {
  return <div style={{ color }}>안녕하세요 {name}</div>
}

Hi.defaultProps = {
  name: '이름없음'
}

export default Hello;
```

#### App.jsx
```jsx
import React from "react";
import Hello from "./components/Hello";
import Hi from "./components/Hi";

function App() {
    return (
        <>
            <Hello name="react" />
            <Hi text="안녕 파랑색" color="blue" />
            <Hi></Hi>
        </>
    );
}

export default App;
```
![](https://velog.velcdn.com/images/artlogy/post/3b31710a-33d5-41e2-b77e-856ef8a6d2a5/image.png)

## Props.children

컴포넌트 태그 사이에 넣은 값을 조회 할떈, props.children을 사용한다.

#### Wrapper.jsx
```jsx
const Wrapper = ({ children }) => {
    const style = {
        border: "2px solid black",
        padding: "16px",
    };
    return <div style={style}>{children}</div>;
};

export default Wrapper;
```

#### App.jsx
```jsx
import React from "react";
import Hello from "./components/Hello";
import Hi from "./components/Hi";
import Wrapper from "./components/Wrapper";

function App() {
    return (
        <Wrapper>
            <Hello name="react" />
            <Hi text="안녕 파랑색" color="blue" />
            <Hi></Hi>
        </Wrapper>
    );
}

export default App;

```

![](https://velog.velcdn.com/images/artlogy/post/a04e0c9d-2b70-4ee3-9022-bce1bab20572/image.png)
