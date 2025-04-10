import { Outlet, Navigate } from "react-router-dom";

const FreelancerRoutes = () => {
  const role : string | null = localStorage.getItem("user_role");

  return role === "freelancer" ? <Outlet /> : <Navigate to={"/home"} />;
};

export default FreelancerRoutes;
