import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 1.5 }} // 1.5s delay, then fade out
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-secondary z-50"
    >
      {/* Logo/Image */}
      <motion.img
        src="/logo.png" // 👉 put your logo here (public/logo.png)
        alt="App Logo"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-32 h-32 drop-shadow-2xl"
      />
      
    </motion.div>
  );
};

const HomePage = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500); // splash 2.5 sec
    return () => clearTimeout(timer);
  }, []);

  const features = [
    { icon: "💬", title: "Real-Time Chat", desc: "Send & receive messages instantly with zero delays." },
    { icon: "👥", title: "Group Chats", desc: "Create groups for friends, family, or work." },
    { icon: "📁", title: "File Sharing", desc: "Share images, videos, and documents securely." },
    { icon: "📞", title: "Voice Calls", desc: "Crystal-clear voice calls powered by WebRTC." },
    { icon: "🎥", title: "Video Calls", desc: "High-quality video with screen sharing." },
    { icon: "🔒", title: "Secure & Private", desc: "End-to-end encryption keeps your data safe." },
  ];

  const steps = [
    { num: "1", title: "Sign Up", desc: "Create your free ChatApp account in seconds." },
    { num: "2", title: "Find Friends", desc: "Add contacts or join groups to start chatting." },
    { num: "3", title: "Start Chatting", desc: "Enjoy real-time messages, calls, and file sharing." },
  ];

  const testimonials = [
    { name: "Aarav", text: "🔥 ChatApp is super smooth and fast! Love the design." },
    { name: "Priya", text: "💯 Finally a chat app that feels modern and easy to use." },
    { name: "Karan", text: "🚀 Secure, fast, and I can use it on all my devices." },
  ];

  return (
    <>
      {showSplash && <SplashScreen />}

      {!showSplash && (
        <div className="min-h-screen bg-gradient-to-br from-base-100 via-primary/5 to-secondary/10 flex flex-col">
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-between px-10 py-24 gap-12">
            {/* Left */}
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl font-extrabold leading-tight text-primary drop-shadow-lg">
                The Future of <span className="text-secondary">Messaging</span>
              </h1>
              <p className="text-lg text-gray-700 max-w-md">
                Chat faster, safer, and smarter. Stay connected with friends and teams worldwide. 🌍
              </p>
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="btn btn-primary px-8 py-3 rounded-xl text-lg shadow-lg hover:scale-105 transition"
                >
                  🚀 Get Started
                </Link>
                <Link
                  to="/about"
                  className="btn btn-outline btn-secondary px-8 py-3 rounded-xl text-lg hover:scale-105 transition"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Right - Chat Mockup */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
            >
              <div className="w-[360px] rounded-3xl shadow-2xl backdrop-blur-lg bg-white/70 border border-gray-200 overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="chat chat-start">
                    <div className="chat-bubble bg-gray-200">Hey 👋</div>
                  </div>
                  <div className="chat chat-end">
                    <div className="chat-bubble bg-primary text-white">
                      Hello! How’s it going?
                    </div>
                  </div>
                  <div className="chat chat-start">
                    <div className="chat-bubble bg-gray-200">
                      Loving this new ChatApp 🚀
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t bg-base-200 text-gray-500 text-sm text-center">
                  Typing...
                </div>
              </div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="px-10 py-20 bg-base-200/50 backdrop-blur-sm">
            <motion.h2
              className="text-4xl font-bold text-center text-primary mb-12"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Features You'll Love ❤️
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  className="card bg-white/70 backdrop-blur-lg shadow-xl rounded-2xl p-6 border hover:shadow-2xl hover:-translate-y-2 transition"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    {f.icon} {f.title}
                  </h3>
                  <p className="text-gray-600">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="px-10 py-20 bg-white">
            <h2 className="text-4xl font-bold text-center text-secondary mb-12">
              How It Works ⚡
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {steps.map((s, i) => (
                <motion.div
                  key={i}
                  className="card bg-base-100 shadow-lg p-8 text-center rounded-xl border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="text-5xl font-bold text-primary mb-4">
                    {s.num}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-600">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="px-10 py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
            <h2 className="text-4xl font-bold text-center text-primary mb-12">
              Loved by Our Users 💬
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="card bg-white/70 backdrop-blur-lg shadow-lg p-6 rounded-xl border hover:scale-105 transition"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                >
                  <p className="text-gray-700 mb-4 italic">“{t.text}”</p>
                  <h4 className="font-bold text-secondary">- {t.name}</h4>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Call To Action */}
          <motion.section
            className="text-center py-24 bg-gradient-to-r from-primary to-secondary text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
              Ready to Start Chatting?
            </h2>
            <p className="text-lg opacity-90 mb-10">
              Join thousands of people already using ChatApp today.
            </p>
            <Link
              to="/login"
              className="btn bg-white text-primary font-bold px-12 py-4 rounded-2xl text-lg shadow-xl hover:scale-110 transition"
            >
              🚀 Create Your Account
            </Link>
          </motion.section>
        </div>
      )}
    </>
  );
};

export default HomePage;
