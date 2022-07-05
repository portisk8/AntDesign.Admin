import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

function MainNoAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/");
  }, []);
  return <Outlet />;
}

export default MainNoAuth;
