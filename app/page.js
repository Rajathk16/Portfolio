"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Certificates from '../components/Certificates';
import { Contact, Footer } from '../components/ContactAndFooter';
import AdminUploader from '../components/AdminUploader';

export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <div 
      className="bg-zinc-950 min-h-screen overflow-hidden relative perspective-[2000px]"
      onMouseMove={handleMouseMove}
    >
      <Navbar />
      
      <motion.main 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="flex-1 w-full relative z-10 origin-center"
      >
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Certificates />
        <Contact />
      </motion.main>
      
      <Footer />
      <AdminUploader />
    </div>
  );
}
