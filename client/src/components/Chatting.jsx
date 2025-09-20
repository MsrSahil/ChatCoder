import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GiHummingbird } from "react-icons/gi";
import api from "../config/Api";
import toast from "react-hot-toast";
import socketAPI from "../config/WebSocket";

const Chatting = ({ friend }) => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ReceiverID, setReceiverID] = useState("");
  const [SenderID, setSenderID] = useState("");

  const bottom = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      SendNewMessage();
    }
  };

  const SendNewMessage = async () => {
    try {
      const messagePack = {
        text: newMessage,
        timestamp: new Date().toISOString(),
      };

      console.log(messagePack);

      if (socketAPI.connected) {
        socketAPI.emit("SendMessage", {
          from: SenderID,
          to: ReceiverID,
          text: newMessage,
          timestamp: messagePack.timestamp,
        });
      } else {
        console.warn("Socket not connected. Message not sent.");
      }

      const res = await api.post(`/user/sendMessage/${ReceiverID}`, {
        messagePack,
      });
      setMessages((prev) => [...prev, res.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending Message:", error);
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  const format_date = (ISO_Date) => {
    const date = new Date(ISO_Date);

    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get(`/user/receiveMessage/${friend._id}`);
      setMessages(res.data.data);
    } catch (error) {
      console.error("Error fetching Chat:", error);
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  const handleReceiveMessage = (msgPacket) => {
    if (msgPacket.from === ReceiverID) {
      setMessages((prev) => [
        ...prev,
        {
          ...msgPacket,
          senderID: msgPacket.from,
          receiverID: msgPacket.to,
          text: msgPacket.text,
          timestamp: msgPacket.timestamp,
        },
      ]);
    }
  };

  const scrollToBottom = () => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socketAPI.on("ReceiveMessage", handleReceiveMessage);

    return () => {
      socketAPI.off("ReceiveMessage", handleReceiveMessage);
    };
  }, [ReceiverID, handleReceiveMessage]);

  useEffect(() => {
    setSenderID(user._id);
    setReceiverID(friend._id || "");
    if (friend?._id) {
      fetchMessages();
    }
  }, [user._id, friend._id]);

  return (
    <>
      <div className="w-full">
        {ReceiverID ? (
          <>
            <div
              className="
             flex gap-3 items-center mx-3 mt-5 bg-secondary p-2 text-secondary-content rounded h-[10vh]"
            >
              <img
                src={friend.photo}
                alt=""
                className="w-12 h-12 rounded-full border border-primary "
              />
              <span className="text-lg">{friend.fullName}</span>
            </div>
            <div className="bg-secondary my-2 h-[75vh] mx-3 rounded p-3 overflow-y-auto">
              {messages ? (
                messages.map((message, index) => (
                  <div
                    className={`chat p-2 ${
                      message.senderID._id === SenderID
                        ? "chat-sender"
                        : "chat-receiver"
                    }`}
                    key={index}
                  >
                    <div className="chat-bubble">{message.text}</div>
                    <div className="chat-footer text-secondary-content/50 text-xs">
                      {format_date(message.timestamp)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full italic text-secondary-content">
                  Send messages to Start Conversatation
                </div>
              )}
              <div ref={bottom}></div>
            </div>
            <div className="bg-secondary my-2  mx-3 h-[8vh] rounded flex gap-5 items-center px-3">
              <input
                type="text"
                name="newMessage"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="input bg-accent text-accent-content"
                placeholder="Your Message ..."
                autoComplete="off"
              />
              <button className="btn btn-success" onClick={SendNewMessage}>
                <GiHummingbird />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-[80vh]">
              <div>Select the Friend to Start Chatting</div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatting;