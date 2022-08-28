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
