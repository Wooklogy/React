import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import counter, { counterSaga } from "./counter";
import reducer from "./exercise";
import todos from "./todo";

const rootReducer = combineReducers({
    reducer,
    counter,
    todos,
});

export function* rootSaga() {
    yield all([counterSaga]); // all은 배열안에 여러 사가를 동시에 실행시켜준다.
}
export default rootReducer;
