import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import OTPModal from "../components/modals/OTPModal";
import toast from "react-hot-toast";
import api from "../config/Api";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add registration logic here
    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Register form submitted:", registerData);

    try {
      const res = await api.post("/auth/sendOtpRegister", registerData);
      toast.success(res.data.message);
      setIsOTPModalOpen(true);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-md p-8 space-y-4 bg-base-200 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="mt-2 text-base-content/70">Sign up to get started</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-base-content"
                >
                  Full Name
                </label>
                <div className="mt-1 relative ">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-base-content/50" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="input ps-10"
                    placeholder="John Doe"
                    value={registerData.fullName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-base-content"
                >
                  Email
                </label>
                <div className="mt-1 relative">
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
                    value={registerData.email}
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
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-base-content/50" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input ps-10"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-base-content"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative ">
                  <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-base-content/50" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="input ps-10"
                    placeholder="••••••••"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

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
                I Agree All Terms and Conditions
              </label>
            </div>

            <div>
              <button type="submit" className="btn btn-primary w-full">
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center mt-2">
            <p className="text-sm text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        callingPage="register"
        data={registerData}
      />
    </>
  );
};

export default Register;