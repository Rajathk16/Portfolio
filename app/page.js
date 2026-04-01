"use client";

import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Certificates from '../components/Certificates';
import { Contact, Footer } from '../components/ContactAndFooter';
import AdminUploader from '../components/AdminUploader';

export default function Home() {
  return (
    <div className="bg-zinc-950 min-h-screen relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Chill Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Navbar />
      
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Certificates />
        <Contact />
      </main>
      
      <Footer />
      <AdminUploader />
    </div>
  );
}
