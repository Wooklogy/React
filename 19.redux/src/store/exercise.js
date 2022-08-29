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

// // 스토어 만들기
// const store = createStore(reducer);

// console.log(store.getState());

// // 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
// const listener = () => {
//     const state = store.getState();
//     console.log(state);
// };

// // store.subscribe(listener)
// // store에 subscribe을 실행하면 구독이 가능하며 스토어 안에 상태가 바뀔때마다 실행될 기능을 작성가능하다 (pipe, intercept 개념)
// const unsubscripbe = store.subscribe(listener);
// // unsubscripbe()
// // 구독을 해제하고 싶을 때는 unsubscribe()를 호출하면 된다.

// //액션들을 디스패치
// store.dispatch(increase());
// store.dispatch(decrease());
// store.dispatch(changeText("안녕하세요"));
// store.dispatch(addToList({ id: 1, text: "와우" }));
