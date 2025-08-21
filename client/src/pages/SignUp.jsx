import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-base-100 to-secondary/20 p-6">
      <motion.div
        className="w-full max-w-md p-10 rounded-3xl shadow-2xl backdrop-blur-lg bg-white/70 border border-gray-200"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-primary drop-shadow mb-6">
          Create Account ✨
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join us and start your chat journey today 🚀
        </p>

        {/* Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-primary rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-primary rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-secondary rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter your password"
              className="input input-bordered w-full bg-white/80 focus:ring-2 focus:ring-secondary rounded-xl"
            />
          </div>

          <motion.button
            type="submit"
            className="btn w-full bg-gradient-to-r from-primary to-secondary text-white text-lg rounded-xl shadow-lg hover:scale-105 transition"
            whileTap={{ scale: 0.95 }}
          >
            🚀 Sign Up
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-secondary font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;
