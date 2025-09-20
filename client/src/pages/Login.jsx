import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import api from "../config/Api";
import OTPModal from "../components/modals/OTPModal";
import { useAuth } from "../context/AuthContext";
import { useGoogleAuth } from "../config/GoogleAuth";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setIsLogin } = useAuth();
  const { isLoading, error, isInitialized, signInWithGoogle } = useGoogleAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here
    console.log("Login form submitted:", loginData);
    try {
      const res = await api.post("/auth/sendOtpLogin", loginData);

      if (res.data.message === "OTP sent successfully") {
        setIsOTPModalOpen(true);
      } else {
        toast.success(res.data.message);
        setUser(res.data.data);
        setIsLogin(true);
        sessionStorage.setItem("ChatUser", JSON.stringify(res.data.data));
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  const handleGoogleSuccess = async (userData) => {
    try {
      console.log("Google login success:", userData);
      const res = await api.post("/auth/googleLogin", userData);
      toast.success(res.data.message);
      sessionStorage.setItem("ChatUser", JSON.stringify(res.data.data));
      setUser(res.data.data);
      setIsLogin(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    }
  };

  const GoogleLogin = () => {
    signInWithGoogle(handleGoogleSuccess, handleGoogleFailure);
  };

  const handleGoogleFailure = (error) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed. Please try again.");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md p-8 space-y-4 bg-base-200 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="mt-2 text-base-content/70">Sign in to your account</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-base-content"
                >
                  Email
                </label>
                <div className="mt-1 relative ">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-base-content/50" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input ps-10"
                    placeholder="you@example.com"
                    value={loginData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-base-content"
                >
                  Password
                </label>
                <div className="mt-1 relative ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-1">
                    <FaLock className="text-base-content/50" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="ps-10 input"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-base-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-base-content"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="#"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full">
                Sign in
              </button>
            </div>
          </form>

          <div className="divider">OR</div>

          <div>
            {error ? (
              <button
                className="btn btn-outline btn-error font-sans flex items-center justify-center gap-2 m-2 w-full"
                disabled
              >
                <FcGoogle className="text-xl" />
                {error}
              </button>
            ) : (
              <button
                onClick={GoogleLogin}
                className="btn btn-outline font-sans flex items-center justify-center gap-2 m-2 w-full"
                disabled={!isInitialized || isLoading}
              >
                <FcGoogle className="text-xl" />
                {isLoading
                  ? "Loading..."
                  : isInitialized
                  ? "Continue with Google"
                  : "Google Auth Error"}
              </button>
            )}
          </div>

          <div className="text-center mt-2">
            <p className="text-sm text-base-content/70">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        callingPage="login"
        data={loginData}
      />
    </>
  );
};

export default Login;