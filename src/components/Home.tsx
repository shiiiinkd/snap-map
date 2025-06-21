//Home.tsx
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button onClick={() => navigate("/page")}>Mapを表示</button>
      </div>
      <div>
        <button onClick={() => navigate("/login")}>ログイン処理</button>
      </div>
      <div>
        <button onClick={() => navigate("/imageUpload")}>写真を表示</button>
      </div>
    </>
  );
};
export default Home;
