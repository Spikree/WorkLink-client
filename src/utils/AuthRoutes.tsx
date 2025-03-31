import { Outlet,Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AuthRoutes = () => {
    const {authUser} = useAuthStore((state) => state);
    return !authUser ? <Outlet/> : <Navigate to={"/dashboard"}/>
}

export default AuthRoutes;