import { Outlet, Navigate } from "react-router-dom";

const EmployerRoutes = () => {
  const role : string | null = localStorage.getItem("user_role");

  return role === "employer" ? <Outlet /> : <Navigate to={"/dashboard"} />;
};

export default EmployerRoutes;
