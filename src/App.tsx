import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";
import AuthRoutes from "./utils/AuthRoutes";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import SidebarLayout from "./lib/SidebarLayout";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobDetails/:jobId" element={<JobDetails />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
