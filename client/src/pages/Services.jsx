import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, ShieldCheck, Zap, Users, Cloud, Smartphone } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const ServicesPage = () => {
  const services = [
    {
      icon: <MessageCircle className="w-10 h-10 text-primary" />,
      title: "Instant Messaging",
      desc: "Fast, reliable, and secure messaging with friends and teams.",
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-secondary" />,
      title: "End-to-End Security",
      desc: "Your chats are protected with top-level encryption.",
    },
    {
      icon: <Zap className="w-10 h-10 text-accent" />,
      title: "Lightning Performance",
      desc: "Experience ultra-fast performance with zero lags.",
    },
    {
      icon: <Users className="w-10 h-10 text-info" />,
      title: "Group Chats",
      desc: "Create groups and stay connected with your community.",
    },
    {
      icon: <Cloud className="w-10 h-10 text-warning" />,
      title: "Cloud Backup",
      desc: "Never lose your chats with automatic cloud sync.",
    },
    {
      icon: <Smartphone className="w-10 h-10 text-success" />,
      title: "Cross-Platform",
      desc: "Use ChatApp anywhere – mobile, tablet, or desktop.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-6 md:p-12">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl mx-auto mb-16"
        variants={fadeUp}
        initial="hidden"
        animate="show"
      >
        <motion.h1
          className="text-5xl font-extrabold text-primary drop-shadow mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Our <span className="text-secondary">Services</span> 🚀
        </motion.h1>
        <p className="text-lg text-gray-600">
          Explore the features that make ChatApp the best way to connect with
          friends and teams.
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="p-8 rounded-3xl bg-white/80 backdrop-blur-lg shadow-lg border hover:shadow-xl transition"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-4 rounded-full bg-base-200"
              >
                {service.icon}
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-primary text-center">
              {service.title}
            </h3>
            <p className="text-gray-600 text-center">{service.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center p-10 mt-20 rounded-3xl shadow-xl bg-gradient-to-r from-primary to-secondary text-white border-4 border-transparent hover:border-white/40 transition"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.05 }}
      >
        <h2 className="text-3xl font-bold mb-4">
          Ready to Experience ChatApp? 🎉
        </h2>
        <p className="mb-6 text-lg">
          Join thousands of users who enjoy seamless communication every day.
        </p>
        <motion.button
          className="btn bg-white text-primary rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default ServicesPage;
