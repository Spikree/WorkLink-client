import { Outlet,Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoutes = () => {
    const {authUser} = useAuthStore();
    return authUser ? <Outlet/> : <Navigate to={"/auth"} />
}

export default ProtectedRoutes;