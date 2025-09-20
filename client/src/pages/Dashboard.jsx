import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import api from "../config/Api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isLogin, setUser, setIsLogin } = useAuth();
  const [isTwoStepEnable, setIsTwoStepEnable] = useState(
    JSON.parse(user?.TwoFactorAuth) || false
  );

  const Toggle2StepVerification = () => {
    // add Backend API Call on route PATCH /user/toggleVerification
  };

  const handleLogout = async () => {
    // add Backend API Call on route GET /auth/logout
    try {
      const res = await api.get("/auth/logout");
      toast.success(res.data.message);
      setUser("");
      setIsLogin(false);
      sessionStorage.removeItem("ChatUser");
      navigate("/");
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    Toggle2StepVerification();
  }, [isTwoStepEnable]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="m-3 rounded shadow border border-secondary h-[88vh] p-10 flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex gap-5 items-center">
            <img
              src={user.photo}
              alt=""
              className="h-36 w-36 rounded object-cover"
            />
            <div className="flex flex-col gap-3">
              <span className="text-3xl text-primary">{user.fullName}</span>
              <span className="text-xl text-secondary">{user.email}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <span>Two Step Verification</span>
            <input
              type="checkbox"
              checked={isTwoStepEnable}
              onChange={(e) => setIsTwoStepEnable(e.target.checked)}
              className="switch switch-success"
            />
          </div>
        </div>
        <div className="">
          <button
            className="btn btn-error flex items-center gap-3"
            onClick={handleLogout}
          >
            <AiOutlineLogout className="text-lg" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
