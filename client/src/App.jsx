import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AboutPage from "./pages/about.jsx";
import ContactPage from "./pages/Contact.jsx";
import LoginPage from "./pages/Login.jsx";
import ServicesPage from "./pages/Services.jsx";
import HomePage from "./pages/Home.jsx";
import SignupPage from "./pages/SignUp.jsx";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/register" element={<SignupPage />} />

          {/* <Route path="/logout" element={<div>Logout</div>} /> */}
          {/* <Route path="/register" element={<div>register</div>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
