import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

type props = {
  setIsLogin: (isLogin: boolean) => void;
}

const Login = ({setIsLogin} : props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {login,isLoggingIn} = useAuthStore();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error,setError] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    if(email === "") {
      setError("Email is required")
      toast.error(error || "Email is required");
      return false;
    }

    if(password === "") {
      setError("Password is required")
      toast.error(error || "Password is required");
      return false;
    }
    return true
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password
    }
    if(!validateForm()) return;
    login(formData)
  }

  const setIsRegister = () => {
    setIsLogin(false)
  }

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 pt-8 pb-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-gray-800 mb-2"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Sign in to your account
            </motion.p>
          </div>

          <form className="px-8 pb-8 space-y-4" onSubmit={handleLogin}>
            <motion.div
              variants={inputVariants}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
            </motion.div>

            <motion.div
              variants={inputVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </motion.div>

            <motion.button
              variants={inputVariants}
              custom={3}
              initial="hidden"
              animate="visible"
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              {isLoggingIn ? "loading..." : "login"}
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-6 text-gray-600"
            >
              Don't have an account?{" "}
              <a
                onClick={setIsRegister}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors cursor-pointer"
              >
                Sign Up
              </a>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
