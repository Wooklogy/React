import React, { useCallback, useEffect, useMemo, useState } from "react";

const User = React.memo(function User({ user, onRemove, onToggle }) {
    return (
        <div>
            {user.active ? (
                <b
                    onClick={() => {
                        onToggle(user.id);
                    }}
                    style={{ color: "green" }}
                >
                    {user.username}
                </b>
            ) : (
                <b
                    onClick={() => {
                        onToggle(user.id);
                    }}
                >
                    {user.username}
                </b>
            )}
            <span>({user.email})</span>
            <button onClick={() => onRemove(user.id)}>삭제</button>
        </div>
    );
});

const UserList = React.memo(({ users, onRemove, onToggle }) => {
    return (
        <div>
            {users.map((el, idx) => (
                <>
                    <User
                        key={el.id}
                        user={el}
                        onRemove={onRemove}
                        onToggle={onToggle}
                    ></User>
                </>
            ))}
        </div>
    );
});

const CreateUser = React.memo(({ username, email, onChange, onCreate }) => {
    return (
        <div>
            <input
                name="username"
                placeholder="계정명"
                onChange={onChange}
                value={username}
            />
            <input
                name="email"
                placeholder="이메일"
                onChange={onChange}
                value={email}
            />
            <button onClick={onCreate}>등록</button>
        </div>
    );
});

const Array = () => {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: "차가운 그녀",
            email: "cold_fish@gmail.com",
            active: true,
        },
        {
            id: 2,
            username: "기네스 맥주",
            email: "guness@gmail.com",
            active: false,
        },
        {
            id: 3,
            username: "나를잡아줘",
            email: "holdme@gmail.com",
            active: false,
        },
    ]);
    const [inputs, setInputs] = useState({
        email: "",
        username: "",
    });
    const { username, email } = inputs;
    const onChange = useCallback(
        (e) => {
            const { value, name } = e.target;
            setInputs({ ...inputs, [name]: value });
        },
        [inputs]
    );
    const onCreate = useCallback(() => {
        // spread를 이용한 방법
        setUsers((users) => [
            ...users,
            {
                id: users.length + 1,
                email: email,
                username: username,
                active: false,
            },
        ]);
        //concat을 이용한 방법
        setUsers((users) =>
            users.concat({
                id: users.length + 1,
                email: email,
                username: username,
                active: false,
            })
        );
    }, [email, username]);
    const onRemove = useCallback((id) => {
        // 해당 id(key)를 제외한 배열로 반환
        setUsers((users) => users.filter((el) => el.id !== id));
    }, []);
    const onToggle = useCallback((id) => {
        setUsers((users) =>
            users.map((el) =>
                el.id === id ? { ...el, active: !el.active } : el
            )
        );
    }, []);
    function countActiveUsers(users) {
        console.log("활성 사용자 수를 세는중...");
        return users.filter((user) => user.active).length;
    }
    const count = useMemo(() => {
        return countActiveUsers(users);
    }, [users]);
    return (
        <>
            <CreateUser
                username={username}
                email={email}
                onChange={onChange}
                onCreate={onCreate}
            />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성사용자 수 :{count}</div>
        </>
    );
};

export default React.memo(Array);
