import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import toast, { Toaster } from "react-hot-toast";
import AuthRoutes from "./utils/AuthRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import EmployerRoutes from "./utils/EmployerRoutes";
import FreelancerRoutes from "./utils/FreelancerRoutes";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SidebarLayout from "./lib/SidebarLayout";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import AppliedJobs from "./pages/AppliedJobs";
import FinishedJobs from "./pages/FinishedJobs";
import SavedJobs from "./pages/SavedJobs";
import CurrentJobs from "./pages/CurrentJobs";
import Home from "./pages/Home";
import PostJob from "./pages/PostJob";
import GetOnGoingJobs from "./pages/GetOnGoingJobs";
import ChatPage from "./pages/ChatPage";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import ChangeEmail from "./pages/ChangeEmail";
import Chat from "./pages/Chat";

function App() {
  const { checkAuth, isCheckingAuth, logout, authUser } = useAuthStore();
  const user_role = localStorage.getItem("user_role");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!authUser) {
      return;
    } else if (user_role !== "freelancer" && user_role !== "employer") {
      logout();
      toast.error("Please Login again");
    }
  }, [user_role, logout, authUser]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
          </Route>

          <Route element={<ProtectedRoutes />}>
            <Route element={<SidebarLayout />}>
              <Route element={<EmployerRoutes />}>
                <Route path="/home" element={<Home />} />
                <Route path="/postJob" element={<PostJob />} />
                <Route path="/getOnGoingJobs" element={<GetOnGoingJobs />} />
              </Route>

              <Route element={<FreelancerRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/jobDetails/:jobId" element={<JobDetails />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/appliedjobs" element={<AppliedJobs />} />
                <Route path="/finishedJobs" element={<FinishedJobs />} />
                <Route path="/savedJobs" element={<SavedJobs />} />
                <Route path="/currentJob" element={<CurrentJobs />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/changePassword" element={<ChangePassword/>} />
                <Route path="/changeEmail" element={<ChangeEmail/>} />
                <Route path="/chatRoom/:id" element={<ChatPage/>} />
              </Route>
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
