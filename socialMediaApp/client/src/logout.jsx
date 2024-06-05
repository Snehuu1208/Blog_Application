import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    alert("User id logging out");
    navigate("/");
  });
};

export default Logout;
