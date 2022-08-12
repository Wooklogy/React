### Node.js
Window는 [Node.js 공식 다운로드](https://nodejs.org/en/)를 통해 LTS버전을 다운하면된다.
> LTS는 Long Term Support의 약자로 장기 지원 버전을 뜻한다.
"믿고 쓸만하다~"라는 느낌으로 알고 있으면 편하다.


mac/linux는, [nvm](https://github.com/nvm-sh/nvm)이라는 도구를 통해 Node.js를 설치하면 된다.
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
$ nvm install --lts
```
> nvm은 Node Version Manager로 여러버전의 노드를 쓰고 관리 할 때 많이 사용한다.


### Yarn
Yarn 은 좀 더 개선된 npm 이라고 생각하시면 좋다. (만약 npm이 좋다면 안써도 무방)
```
$ npm install --global yarn
$ yarn -v
```

### Code Editor
[Vs Code 공식 홈페이지](https://code.visualstudio.com/) : 가장 일반적으로 많이 씀

[WebStorm](https://www.jetbrains.com/ko-kr/webstorm/) : 떠오르는 신흥강자

다른 에디터도 많지만 React개발은 위 2개중 하나 선택하는게 좋다.
(싫으면 원하는거 써도 무방)

### 새 프로젝트 만들어보기

리액트 프로젝트를 만들어보자. 터미널을 열고, 다음 명령어를 입력하면 된다.

```
$ npx create-react-app hello-react
```
그러면 해당 명령을 실행한 경로에 hello-react라는 폴더가 생성 되었을텐데
다음과 같이 해당경로로 이동하여 실행시켜보자.
```
$ cd hello-react
$ yarn start
```
![위와 같은 화면이 뜬다면 성공!](https://velog.velcdn.com/images/artlogy/post/2ea01e87-8ecb-431f-9c99-8b0c3b88c5ed/image.png) 이러한 화면이 뜬다면 성공!
