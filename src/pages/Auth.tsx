import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:flex md:w-1/2 bg-gradient-to-r from-primary to-secondary items-center justify-center p-8"
      >
        <img
          src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x1.webp"
          alt="image"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center md:p-8">
        <div className="w-full space-y-8">
          {isLogin ? (
            <Login setIsLogin={setIsLogin} />
          ) : (
            <Register setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
