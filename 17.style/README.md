리액트에서 컴포넌트 스타일링을 하는 가장 기본적인 방법은 css 파일을 만들어 `import`하여 사용하는 것이지만 다른 도구들을 이용하면 다 편리하게 작업 할 수도 있다.

## Sass

Sass (Syntactically Awesome Style Sheets: 문법적으로 짱 멋진 스타일시트) 는 CSS pre-processor 로서, 복잡한 작업을 쉽게 할 수 있게 해주고, 코드의 재활용성을 높여줄 뿐 만 아니라, 코드의 가독성을 높여주어 유지보수를 쉽게해준다.

Sass는 두가지 확장자 (.scss/.sass)를 지원하는데 두가지 문법이 다르다.
일단은 scss확장자 스타일로 진행하겠다.

### 시작하기

```node
$ yarn add node-sass
```

위 라이브러리는 Sass를 CSS로 변환해주는 역할을 한다.

#### scss/Button.scss

```scss
$blue: #228be6;   //변수선언

.Button{
	display:inline-flex;
    color:white;
    font-weight:bold
    outline:none;
    border-radius:4px;
    border:none;
    cursor:pointer;

    padding-right: 1rem;
    font-size: 1rem;

    background: $blue;   //변수사용

    // &는 this라는 뜻
    //.Button:hover
    &:hover{
    	background:lighten($blue, 10%); //색상 10%밝게
    }
    //.Buton:active
    &:active{
    	background:darken($blue, 10%); //색상 10%어둡게
    }
}
```

scss파일의 형태는 위 와같다. `$blue:#228be6;`처럼 변수를 선언하거나 `lighten()`, `darken()`와 같은 내장함수를 이용 할 수 있다. 물론 css에서도 다 지원하는 기능들이지만 문법적으로 더 깔끔하다는 느낌을 받을 수 있다.

### 버튼 사이즈 조정하기

#### button.jsx

```jsx
import React from "react";
import "./scss/Button.scss";

function Button({ children, size }) {
    return <button className={`Button ${size}`}>{children}</button>;
}

Button.defaultProps = {
    size: "medium",
};

export default Button;
```

className을 props에 따라 변하게 만들어 `size`값에 따른 버튼 스타일을 동적으로 바꿔보자

```jsx
$blue: #228be6;
$gray: #495057;
$pink: #f06595;

.Button {
    display: inline-flex;
    color: white;
    font-weight: bold;
    outline: none;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    // 사이즈 관리
    &.large {
        height: 3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 1.25rem;
    }

    &.medium {
        height: 2.25rem;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 1rem;
    }

    &.small {
        height: 1.75rem;
        font-size: 0.875rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }

    // 색상 관리
    &.blue {
        background: $blue;
        &:hover {
            background: lighten($blue, 10%);
        }

        &:active {
            background: darken($blue, 10%);
        }
    }

    &.gray {
        background: $gray;
        &:hover {
            background: lighten($gray, 10%);
        }

        &:active {
            background: darken($gray, 10%);
        }
    }

    &.pink {
        background: $pink;
        &:hover {
            background: lighten($pink, 10%);
        }

        &:active {
            background: darken($pink, 10%);
        }
    }

    & + & {
        margin-left: 1rem;
    }
}
```

#### App.jsx

```jsx
import React from "react";
import Button from "./components/Button";

function App() {
    return (
        <>
            <div className="App">
                <div className="buttons">
                    <Button size="large">BUTTON</Button>
                    <Button>BUTTON</Button>
                    <Button size="small">BUTTON</Button>
                </div>
                <div className="buttons">
                    <Button size="large" color="gray">
                        BUTTON
                    </Button>
                    <Button color="gray">BUTTON</Button>
                    <Button size="small" color="gray">
                        BUTTON
                    </Button>
                </div>
                <div className="buttons">
                    <Button size="large" color="pink">
                        BUTTON
                    </Button>
                    <Button color="pink">BUTTON</Button>
                    <Button size="small" color="pink">
                        BUTTON
                    </Button>
                </div>
            </div>
        </>
    );
}

export default App;
```

## CSS Module

이번에는 CSS Module 이라는 기술에 대해 알아보자. 리액트에서 CSS Module을 사용하면, CSS클래스가 중첩되는 것을 완벽히 방지 할 수 있다.

#### box.module.css

```css
.Box {
    background: black;
    color: white;
    padding: 2rem;
}
```

#### Box.jsx

```jsx
import React from "react";
import styles from "../css/Box.module.css";

function Box() {
    return <div className={styles.Box}>{styles.Box}</div>;
}

export default Box;
```

`className`을 설정 할 땐 `style.Box` 이렇게 import로 불러온 styles 객체 안에 있는 값을 참조 해야한다.

## styled-components

이번에는 CSS-IN-JS기술인 JS안에 CSS를 작성하는 styled-components를 다뤄보자.
styled-components는 현존하는 CSS-IN-JS 리액트 라이브러리중 가장 인기있는 라이브러리다.

> 다른 라이브러리는 EMOTION, STYLED-JSX등이 있다.

### styled-components 사용하기

```linux
$ yarn add styled-components
```

#### Styles/Circle.jsx

```jsx
import styled from "styled-components";

export const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: black;
    border-radius: 50%;
`;

export default Circle;
```

#### App.jsx

```jsx
import React from "react";
import Circle from "styles/Circle";

function App() {
    return (
        <>
            <div className="App">
                <Circle></Circle>
            </div>
        </>
    );
}

export default App;
```

위 코드처럼 스타일이 적용된 요소를 컴포넌트 형식으로 사용 할 수 있다.
`styled`는 dom에서 `createElement` 라고 생각하면되고 `.div`는 `createElement("div")`라고 생각하면된다.
즉, `div`를 생성하고 해당 요소에 스타일을 적용하는 식이라고 생각하면된다.
당연히 `div`외에 `button`, `input`, `span`등등 다양하게 생성하여 적용 할 수 있다.

위에서 스타일 요소를 컴포넌트 형식으로 사용 할 수 있다고 설명하였다.
즉 props, 조건부 스타일적용, hooks사용등 스타일 적용에도 리액트 컴포넌트의 기능을 사용 가능하다.

### styled-components use props

#### Circle.jsx

```jsx
import React from "react";
import styled from "styled-components";

export const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: ${(props) => props.color || "black"};
    border-radius: 50%;
`;

Circle.defaultProps = {
    color: "red",
};
export default Circle;
```

props는 Template literal를 사용하여 구현한다.

#### App.jsx

```jsx
import React from "react";
import Circle from "styles/Circle";

function App() {
    return (
        <>
            <div className="App">
                <Circle color="blue"></Circle>
            </div>
        </>
    );
}

export default App;
```

파란색 원이 나타난다면 성공이다.

이번엔 props에 따라 스타일을 다르게 설정해보겠다.

#### Circle.jsx

```jsx
import React from "react";
import styled, { css } from "styled-components";

export const Circle = styled.div`
    width: 5rem;
    height: 5rem;
    background-color: ${(props) => props.color || "black"};
    border-radius: 50%;
    ${(props) =>
        props.rect &&
        css`
            border-radius: 0%;
        `}
`;

Circle.defaultProps = {
    color: "red",
};
export default Circle;
```

#### App.jsx

```jsx
import React from "react";
import Circle from "styles/Circle";

function App() {
    return (
        <>
            <div className="App">
                <Circle color="blue" rect></Circle>
            </div>
        </>
    );
}

export default App;
```

파란색 네모가 랜더 된다면 성공이다.

위 처럼 조건에 따라 여러 스타일을 바꿔서 보여주고 싶다면 `css`를 사용하면 된다.
`css`내부에서도 Template literal를 사용해 제어 할 수 있다.

### polished의 스타일 관련 유틸 함수 사용하기

Sass를 사용 할 때 `lighten()`, `darken()`과 같은 유틸 함수를 사용하였는데
CSS in JS (styled-components)에서도 polished라는 라이브러리를 사용하여 구현 가능하다.

```
$ yarn add polished
```

#### Circle.jsx

```jsx
import { lighten } from "polished";
import React from "react";
import styled, { css } from "styled-components";

export const Circle = styled.div`
    $primary-color: #228be6;
    width: 5rem;
    height: 5rem;
    background-color: ${(props) => props.color || "black"};
    border-radius: 50%;
    &:hover {
        background: ${lighten(0.1, "#228be6")};
    }

    ${(props) =>
        props.rect &&
        css`
            border-radius: 0%;
        `}
`;

Circle.defaultProps = {
    color: "red",
};
export default Circle;
```

마우스를 올렸을때 색이 변한다면 성공이다.

이번에는 전역적으로 사용 할 스타일을 선언하고 하위 컴포넌트에서 사용해보자.

### ThemeProvider

실무를 진행하다보면, `primary-color` `layout-size`등 공통적으로 쓰이는 스타일값이 존재하는 법이다. 컴포넌트 단위의 스타일이 아닌 이 처럼 값단위라면 `ThemeProvider`를 사용하여 전역 스타일값을 설정해주고 하위 컴포넌트에서 사용 할 수 있다.

#### App.jsx

```jsx
import React from "react";
import { ThemeProvider } from "styled-components";
import Circle from "styles/Circle";

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
                <div className="App">
                    <Circle color="blue" rect></Circle>
                </div>
            </ThemeProvider>
        </>
    );
}

export default App;
```

위 처럼 `theme`를 설정하면 ThemeProvider 내부에 랜더링된 컴포넌트에서 값을 조회하여 사용 할 수 있다.

#### Circle.jsx

```jsx
import { lighten } from "polished";
import React from "react";
import styled, { css } from "styled-components";

export const Circle = styled.div`
    $primary-color: #228be6;
    width: 5rem;
    height: 5rem;
    background-color: ${(props) => props.color || "black"};
    border-radius: 50%;
    &:hover {
        background: ${lighten(0.1, "#228be6")};
    }

    /* 색상 */
    ${({ theme, color }) => {
        const selected = theme.palette[color];
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.1, selected)};
            }
        `;
    }}
    ${(props) =>
        props.rect &&
        css`
            border-radius: 0%;
        `}
`;

Circle.defaultProps = {
    color: "red",
};
export default Circle;
```

이정도만 알고 있어도 styled-coponents를 사용하는데 문제는 없지만
더 다양한 기능이 있으니 한번 찾아보는 것도 좋을거같다.
