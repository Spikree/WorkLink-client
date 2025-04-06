import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";

const SidebarLayout = () => {
    return (
        <div className="flex flex-col sm:flex-row h-screen overflow-hidden">
            <Sidebar/>
            <MobileNav/>
            <div className="flex-grow bg-gray-100 p-4 sm:p-6 overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    )
}

export default SidebarLayout