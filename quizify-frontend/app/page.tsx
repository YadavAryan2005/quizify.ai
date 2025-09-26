"use client"
import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import QuizMaker from "./components/QuizMaker";
import Testimonials from "./components/Testimonials";
import LoginModal from "./components/LoginModal";
import { LoginProvider } from "./context/LoginContext";
import { useEffect } from "react";


export default function Home() {
  return (
    <LoginProvider>
    <div className="min-h-screen">
    <Navbar/>
    <Hero />
    <Features/>
    <HowItWorks/>
    <Testimonials/>
    <Footer/>
    </div>
    </LoginProvider>
  );
}
