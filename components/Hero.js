"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950"
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1000px] max-h-[1000px] bg-cyan-500/5 blur-[160px] rounded-full z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col gap-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)] w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            System Online
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-white leading-tight">
            Rajath <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">K</span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-300 font-bold tracking-wide border-l-4 border-cyan-500 pl-4 py-1">
            Student @ Sahyadri College of Engineering
          </p>

          <div className="text-lg text-zinc-400 leading-relaxed max-w-xl space-y-4">
            <p>
              I'm deeply passionate about building the future through code. I'm currently expanding my logic via <strong className="text-white px-1 border border-zinc-700 rounded bg-zinc-800">C++ with DSA</strong>.
            </p>
            <p>
              Right now, I'm developing systems bridging <strong className="text-cyan-400">Cybersecurity</strong> and <strong className="text-blue-400">IoT</strong>, building platforms that are smart and impenetrable.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-6"
          >
            <a href="#projects" className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl border border-zinc-700 hover:border-cyan-500 hover:text-cyan-400 transition-all font-bold bg-zinc-900/50 backdrop-blur shadow-2xl text-white">
              Let's Connect
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
          className="relative flex justify-center items-center h-full w-full py-10"
        >
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex items-center justify-center">
            {/* Animated Rings */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-cyan-500/10 animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-10 rounded-full border border-zinc-800 shadow-[0_0_50px_rgba(6,182,212,0.05)]" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-blue-500/10 animate-[spin_20s_linear_infinite_reverse]" />

            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-zinc-900 border-4 border-cyan-500/20 shadow-[0_0_60px_rgba(6,182,212,0.2)] flex items-center justify-center overflow-hidden relative z-10"
            >
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQFiZr5iimHRCA/profile-displayphoto-scale_400_400/B56ZzEJyWSHsAg-/0/1772817428392?e=1776297600&v=beta&t=QcIR-B3d6RznZ5Sm-Xi62STtemO8asNYC90-VD1_syM"
                alt="Rajath Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 mix-blend-overlay" />
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -top-4 right-5 md:-right-5 px-6 py-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg text-sm md:text-base font-black text-white shadow-2xl border-t-cyan-500 tracking-wider z-20"
            >
              C++ <span className="text-cyan-500">DSA</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-6 md:-left-10 px-6 py-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg text-sm md:text-base font-black text-cyan-400 shadow-2xl border-l-cyan-500 tracking-wider z-20"
            >
              Cybersecurity
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 -right-6 md:-right-10 px-6 py-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-lg text-sm md:text-base font-black text-purple-400 shadow-2xl border-b-purple-500 tracking-wider z-20"
            >
              IoT Systems
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
