## React에서 Router가 필요한 이유

### React는 기본적으로 SPA 기반이다.

SPA(Single Page Apllication)의 약자로 페이지를 하나만 쓰는 어플리케이션이라는 뜻이다.
HTML을 해보신 분들은 알겠지만 전통적인 웹어플리케이션의 구조는 여러페이지를 사용하여, 유저의 요청이 있을때마다 페이지가 새로고침되고 리소르를 전달받아 랜더링하는 식이다.(MPA)

하지만 리액트를 배우는 이유와 어느정도 상통한데 기존 MPA방식은 요청이 있을때마다 페이지 전체요소를 로드하기 때문에 속도적인 측면에서 많은 문제가 생긴다. 싱글페이지라고 해서 한 화면만 있는건 아니다. 홈, 로그인, 회원가입등등 주소에 따라 나누지 않는다면 유저가 웹을 사용할때 가이딩이 확실히 되지않아 오히려 불편하다.

때문에 SPA환경에서도 주소에 따른 view를 컨트롤 하고 싶을때
React-router라이브러리를 쓰게된다. ( 공식 라이브러리는 아니지만 제일 많이 쓰는 라이브러리이다.)

### 리액트 라우터 사용하기

```jsx
$ yarn add react-router-dom
```

### App.js

```jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
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
                <BrowserRouter>
                    <div className="App">
                        <Circle color="blue" rect></Circle>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
```

라우터 적용은 `BrowserRouter` 컴포넌트를 선언하여 해당 컴포넌트 내부에서 라우팅 컨트롤을 하면 된다.

### 페이지 만들기

#### views/Home.jsx

```jsx
import React from "react";

const Home = () => {
    return (
        <div>
            <h1>홈</h1>
            <p>이곳은 홈이에요. 가장 먼저 보여지는 페이지죠.</p>
        </div>
    );
};

export default Home;
```

```jsx
import React from "react";

const About = () => {
    return (
        <div>
            <h1>소개</h1>
            <p>
                이 프로젝트는 리액트 라우터 기초를 실습해보는 예제
                프로젝트랍니다.
            </p>
        </div>
    );
};

export default About;
```

### Route: 특정 주소에 컴포넌트 연결하기

사용자가 요청하는 주소에 따라 다른 컴포넌트를 보여주는 작업을 할 때 `Route` 라는 컴포넌트를 사용합니다.

사용 방식은 다음과 같다.

```jsx
<Route path="주소규칙" element={</Home>} />
```

#### src/App.jsx

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";

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
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
```

여기까지 하고 `yarn start`를 하여 서버를 시작하자
`/`경로로 들어가면 홈 컴포넌트가 뜨고 `about`경로로 들어가면 소개가 뜨면 성공이다.

> router6.0버전부턴 `Route`컴포넌트는 `Routes`내부에 존재해야 한다.

### Link: 누르면 다른 주소로 이동

`Link` 컴포넌트는 클릭하면 다른 주소로 이동시키는 컴포넌트이다.
리액트 라우트를 사용할땐 일반적으로 쓰는 `<a href="..."></a>`태그를 사용해선 안된다.
만약 한다면 `onClick()`에서 `e.preventDefault()` 호출하여 기본적으로 적용된 이벤트 실행을 제거하고 코드를 통해 리다이렉트를 해줘야한다. a태그는 페이지를 새로 불러오기 때문에 앱이 지니고 있는 상태, 랜더링 되어있는 컴포넌트도 모두 초기화 되어 새로 랜더링 되기때문에 최적화 측면에서 적절하지 않다.

그 대신 `Link`태그를 사용한다 이 컴포넌트는 [HTML5 History API](https://developer.mozilla.org/ko/docs/Web/API/History)를 사용하여 브라우저의 주소만 바꿀뿐 페이지를 새로 불러오지는 않기 때문이다.

#### Home.jsx

```jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div>
                <ul>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <li>
                        <Link to="/about">디테일</Link>
                    </li>
                </ul>
            </div>
            <hr />
            <h1>홈</h1>
            <p>홈페이지</p>
        </div>
    );
};

export default Home;
```

## 파라미터와 쿼리

페이지 주소를 정의 할 때, 유동적인 값을 전달해야 할때가 있다.
이는 파라미터와 쿼리로 나누어질 수 있다.

```
파라미터: /profiles/artlogy
쿼리: /about?details=true
```

무조건 적인 규칙은 없지만, 일반적으로 파라미터는 특정 정보를 가지고 조회를 할 때, 쿼리에 경우 어떤 키워드를 검색하거나 요청할때 사용하는 옵션이다.

### URL Params

파라미터를 받아오는 예제코드를 작성해보겠다.

```jsx
<Route path="/profiles/:username" element={<Profile></Profile>}></Route>
```

#### views/Profile.jsx

```jsx
import React from "react";
import { useParams } from "react-router-dom";

const profileData = {
    artlogy: {
        name: "장현욱",
        description: "stupid engineer",
    },
    ana: {
        name: "아나",
        description: "전래동화의 주인공",
    },
};

const Profile = () => {
    const { username } = useParams();
    const profile = profileData[username];
    if (!profile) {
        return <div>존재하지 않는 유저입니다.</div>;
    }
    return (
        <div>
            <h3>
                {username}({profile.name})
            </h3>
            <p>{profile.description}</p>
        </div>
    );
};

export default Profile;
```

`usePrams()`를 사용하면 url 파라미터값을 얻어올 수 있다.

### Query

이번에는 About 페이지에서 쿼리를 받아와 보자. 쿼리는 라우트 컴포넌트에서
`useSearchParams()`를 이용하여 받아 올 수 있다.

```jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

const About = () => {
    const [queryData] = useSearchParams();
    console.log(queryData.get("detail"));
    return (
        <div>
            <h1>소개</h1>
            <p>소개합니다</p>
        </div>
    );
};

export default About;
```

[주소](http://localhost:3000/about?detail=true)<-에서 콘솔에 true가 나온다면 성공입니다.

## 서브 라우터

서브라우터는 라우터 내부에 라우터를 만드는 것을 뜻한다.
그냥 컴포넌트를 만들어서 그 안에 또 Route 컴포넌트를 랜더링 하면 되긴한다.

#### App.jsx

```jsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "views/Home";
import About from "views/About";
import Profiles from "views/Profiles";

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

먼저 서브 라우팅을 할때 '\*'를 사용해 서브 라우팅이 있다는 것을 명시합니다.

#### views/Profiles.jsx

```jsx
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
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

백앤드에서 앤드포인트를 설계할때와 비슷하다.
profiles를 기본 url로 하위 주소를 위 처럼 리딩 할 수 있다.
때문에 navigate컴포넌트처럼 내부에서 리다이렉트를 많이하는 컴포넌트는 `state` 관리하는 것보단 서브라우터를 사용하는게 좋다.

## React Router 부가 기능

### useNavigate Hook

`useNavigate()`객체는 뒤로가기,특정 경로 이동, 이탈방지등의 라우팅 컨트롤을 할 수 있다.

#### views/RouterTest.jsx

```jsx
import { useNavigate } from "react-router-dom";

export default function RouterTest() {
    const navigate = useNavigate();
    return (
        <div>
            <button
                onClick={() => {
                    navigate(-1);
                }}
            >
                history 뒤로 이동
            </button>
            <button
                onClick={() => {
                    navigate("/admin");
                }}
            >
                절대 경로 이동
            </button>
            <button
                onClick={() => {
                    navigate("../content");
                }}
            >
                상대 경로 이동
            </button>
            <button
                onClick={() => {
                    navigate("/admin", { replace: true });
                }}
            >
                history 이력 안남김
            </button>
        </div>
    );
}
```

### useLocation hook

`useLocation()`은 현재 url의 정보를 가져온다.

```jsx
const location = useLocation();

useEffect(() => {
    console.log(location);
}, [location]);
```

콘솔을 보면 다음과 같이 확인 할 수 있다.
![](https://velog.velcdn.com/images/artlogy/post/94278c3d-c463-400e-9a27-f215193d28ab/image.png)

> 이 모든 과정은 react-router-dom v6버전을 기준으로 작성된 것이다.
> v5와 v6는 차이점이 많으니 버전 확인을 잘 하길 바란다.
