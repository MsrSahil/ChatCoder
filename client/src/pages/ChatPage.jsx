import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Chatting from "../components/Chatting";
import api from "../config/Api";
import socketAPI from "../config/WebSocket";

const ChatPage = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState("");

  const [selectedFriend, setSelectedFriend] = useState("");

  const fetchAllUser = async () => {
    try {
      const res = await api.get("/user/allUsers");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    if (!user && !isLogin) {
      navigate("/login");
    } else {
      fetchAllUser();

      socketAPI.emit("CreatePath", user._id);
    }

    return () => {
      user?._id && socketAPI.emit("DeletePath", user._id);
    };
  }, [user, isLogin, navigate]);

  return (
    <>
      <div className="min-h-screen bg-base-100 flex">
        <div className="w-3/14 border px-5 pt-5">
          <div className="flex gap-3 items-center">
            <img src={user.photo} alt="" className="w-14 h-14 rounded" />
            <div className="flex flex-col">
              <span className="text-2xl text-primary">{user.fullName}</span>
              <span className="text-sm text-secondary">{user.email}</span>
            </div>
          </div>
          <div className="divider divider-primary pt-5"></div>
          <div id="Firend_List">
            {users &&
              users.map((element, index) => (
                <div
                  key={index}
                  className="group flex gap-3 items-center m-3 bg-secondary p-2 text-secondary-content rounded hover:bg-primary hover:text-primary-content"
                  onClick={() => {
                    setSelectedFriend(element);
                  }}
                >
                  <img
                    src={element.photo}
                    alt=""
                    className="w-12 h-12 rounded-full border border-primary group-hover:border-error"
                  />
                  <span className="text-lg">{element.fullName}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="w-11/14 border">
          <Chatting friend={selectedFriend} />
        </div>
      </div>
    </>
  );
};

export default ChatPage;