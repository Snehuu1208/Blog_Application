/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProtected = (props) => {
  const { Item } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  });
  return (
    <div>
      <Item />
    </div>
  );
};

export default AuthProtected;
