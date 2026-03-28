"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateXRight = useTransform(mouseYSpring, [-0.5, 0.5], ["18deg", "-18deg"]);
  const rotateYRight = useTransform(mouseXSpring, [-0.5, 0.5], ["-18deg", "18deg"]);

  const rotateXLeft = useTransform(mouseYSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  const rotateYLeft = useTransform(mouseXSpring, [-0.5, 0.5], ["8deg", "-8deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          x: useTransform(mouseXSpring, [-0.5, 0.5], [-100, 100]),
          y: useTransform(mouseYSpring, [-0.5, 0.5], [-100, 100])
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full z-0 pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center" style={{ transformStyle: "preserve-3d" }}>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ rotateX: rotateXLeft, rotateY: rotateYLeft, transformStyle: "preserve-3d" }}
          className="flex flex-col gap-6"
        >
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-sm font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            System Online
          </motion.div>

          <h1
            style={{ transform: "translateZ(80px)" }}
            className="text-6xl md:text-8xl font-black tracking-tight text-white leading-tight drop-shadow-[0_20px_30px_rgba(6,182,212,0.2)]"
          >
            Rajath <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 drop-shadow-2xl inline-block" style={{ transform: "translateZ(20px)" }}>K</span>
          </h1>

          <p
            style={{ transform: "translateZ(50px)" }}
            className="text-xl md:text-2xl text-zinc-300 font-bold tracking-wide border-l-4 border-cyan-500 pl-4 py-1"
          >
            Student @ Sahyadri College of Engineering
          </p>

          <div className="text-lg text-zinc-400 leading-relaxed max-w-xl space-y-4" style={{ transform: "translateZ(20px)" }}>
            <p>
              I'm deeply passionate about building the future through code. I'm currently expanding my logic via <strong className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] px-1 border border-zinc-700 rounded bg-zinc-800">C++ with DSA</strong>.
            </p>
            <p>
              Right now, I'm developing an exciting new project bridging <strong className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">Cybersecurity</strong> and <strong className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">IoT</strong>, building systems that are both smart and impenetrable.
            </p>
          </div>

          <motion.div
            style={{ transform: "translateZ(60px)" }}
            className="flex flex-wrap gap-4 mt-6"
          >
            <a href="#projects" className="px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black transition-all shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.8)]">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl border-2 border-zinc-700 hover:border-cyan-500 hover:text-cyan-400 transition-all font-bold relative group overflow-hidden bg-zinc-900/50 backdrop-blur shadow-2xl">
              <span className="relative z-10 text-white group-hover:text-cyan-400 transition-colors">Let's Connect</span>
              <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
          className="relative flex justify-center items-center h-full w-full py-10 pointer-events-none"
        >
          <motion.div
            className="relative w-72 h-72 md:w-[450px] md:h-[450px] flex items-center justify-center pointer-events-auto cursor-crosshair"
            style={{ rotateX: rotateXRight, rotateY: rotateYRight, transformStyle: "preserve-3d" }}
          >
            <div style={{ transform: "translateZ(-80px)" }} className="absolute inset-4 rounded-full border-4 border-dashed border-cyan-500/10 animate-[spin_30s_linear_infinite]" />
            <div style={{ transform: "translateZ(-40px)" }} className="absolute inset-10 rounded-full border border-zinc-700/50 shadow-[0_0_50px_rgba(6,182,212,0.1)]" />
            <div style={{ transform: "translateZ(-120px)" }} className="absolute inset-2 rounded-full border-[10px] border-dashed border-blue-500/10 animate-[spin_20s_linear_infinite_reverse]" />

            <div
              style={{ transform: "translateZ(40px)" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-zinc-900 border-4 border-cyan-500/50 shadow-[0_0_60px_rgba(6,182,212,0.5)] flex items-center justify-center overflow-hidden relative">
                <img
                  src="https://media.licdn.com/dms/image/v2/D5603AQFiZr5iimHRCA/profile-displayphoto-scale_400_400/B56ZzEJyWSHsAg-/0/1772817428392?e=1776297600&v=beta&t=QcIR-B3d6RznZ5Sm-Xi62STtemO8asNYC90-VD1_syM"
                  alt="Rajath Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 mix-blend-overlay" />
              </div>
            </div>

            <motion.div
              style={{ transform: "translateZ(120px)" }}
              animate={{ y: [0, -10, -5, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute -top-4 right-5 md:-right-5 px-6 py-2 bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700 rounded-lg text-sm md:text-base font-black text-white shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t-cyan-500 tracking-wider"
            >
              C++ <span className="text-cyan-500">DSA</span>
            </motion.div>

            <motion.div
              style={{ transform: "translateZ(160px)" }}
              animate={{ y: [0, 15, 5, 20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-6 md:-left-10 px-6 py-2 bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700 rounded-lg text-sm md:text-base font-black text-cyan-400 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-l-cyan-500 tracking-wider"
            >
              Cybersecurity
            </motion.div>

            <motion.div
              style={{ transform: "translateZ(90px)" }}
              animate={{ y: [0, -12, -2, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 -right-6 md:-right-10 px-6 py-2 bg-zinc-900/90 backdrop-blur-md border-2 border-zinc-700 rounded-lg text-sm md:text-base font-black text-purple-400 shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b-purple-500 tracking-wider"
            >
              IoT Systems
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
