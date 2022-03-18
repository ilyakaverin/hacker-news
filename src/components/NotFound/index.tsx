import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>There is nothing here!</h2>
      <button onClick={() => navigate("/")}>Back to Main</button>
    </>
  );
};
export default NotFound;
