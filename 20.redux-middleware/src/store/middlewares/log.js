const actionLogger = (store) => (next) => (action) => {
    console.log(action);
    const result = next(action);
    // 업데이트 이후의 상태를 조회
    console.log("\t", store.getState());
    return result; // 여기서 반환하는 값은 dispatch(action)의 결과. 기본: undefined
};

export default actionLogger;
