import { combineReducers } from "redux";
import reducer from "./exercise";
import todos from "./todo";

const rootReducer = combineReducers({
    reducer,
    todos,
});

export default rootReducer;
