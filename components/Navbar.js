"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-900 shadow-xl' : 'bg-transparent'}`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#about" className="text-zinc-400 hover:text-cyan-400 transition-colors">About</a>
          <a href="#skills" className="text-zinc-400 hover:text-cyan-400 transition-colors">Skills Tree</a>
          <a href="#projects" className="text-zinc-400 hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#achievements" className="text-zinc-400 hover:text-cyan-400 transition-colors">Achievements</a>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-white hover:border-cyan-500 transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
