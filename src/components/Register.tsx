import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore.ts";
import toast from "react-hot-toast";

type props = {
    setIsLogin: (isLogin: boolean) => void;
}

const Register = ({setIsLogin} : props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error,setError] = useState<string>("");
  const {signup,isSigningUp} = useAuthStore();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    role: "employer",
    name: "",
    portfolio: "",
  });
  const [currentStep, setCurrentStep] = useState(1);

  const  handleIsLogin = () => {
    setIsLogin(true)
  }

  const validateForm = () => {
    if(userDetails.email === "") {
      setError("Email is required");
      toast.error(error);
      return false;
    } else if(userDetails.password) {
      setError("Password is required")
      toast.error(error);
      return false;
    } else if(userDetails.name === "") {
      setError("Name is required");
      toast.error(error)
      return false;
    } 
    return true
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!validateForm()) return;
    signup(userDetails);
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const inputVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.1 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br flex justify-center items-center p-4">
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
              Create Account
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600"
            >
              Join our community today
            </motion.p>
          </div>

          <form className="px-8 pb-8" onSubmit={handleSignUp}>
            <AnimatePresence mode="wait" custom={currentStep === 1 ? 1 : -1}>
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={1}
                  className="space-y-4"
                >
                  <motion.div
                    variants={inputVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={userDetails.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={userDetails.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={userDetails.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </motion.div>

                  <motion.button
                    variants={inputVariants}
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Continue <FaArrowRight size={16} />
                  </motion.button>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  custom={-1}
                  className="space-y-4"
                >
                  <motion.div
                    variants={inputVariants}
                    custom={1}
                    initial="hidden"
                    animate="visible"
                  >
                    <input
                      type="url"
                      name="portfolio"
                      placeholder="Portfolio URL (optional)"
                      value={userDetails.portfolio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    />
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    custom={2}
                    initial="hidden"
                    animate="visible"
                  >
                    <select
                      name="role"
                      value={userDetails.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                    >
                      <option value="employer">I'm an Employer</option>
                      <option value="freelancer">I'm a Freelancer</option>
                    </select>
                  </motion.div>

                  <motion.div
                    variants={inputVariants}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-3"
                  >
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                    >
                      {isSigningUp?"loading":"create account"}
                    </button>

                    <button
                      type="button"
                      onClick={prevStep}
                      className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <FaArrowLeft size={16} /> Back
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-6 text-gray-600"
            >
              Already have an account?{" "}
              <a
                onClick={handleIsLogin}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors cursor-pointer"
              >
                Login
              </a>
            </motion.p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
