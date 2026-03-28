"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

function AchievementTiltCard({ ach, isLeft, delay }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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

  const borderColor = isLeft ? "border-cyan-500" : "border-purple-500";
  const glowShadow = isLeft ? "shadow-[0_0_20px_rgba(6,182,212,0.3)]" : "shadow-[0_0_20px_rgba(168,85,247,0.3)]";
  const textColor = isLeft ? "text-cyan-400" : "text-purple-400";
  const bgGradient = isLeft ? "from-cyan-500/10" : "from-purple-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 ${isLeft ? "md:pr-8" : "md:pl-8"} w-full`}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r ${isLeft ? 'right-0 from-transparent to-cyan-500 origin-right' : 'left-0 from-purple-500 to-transparent origin-left'} w-8 z-0`}
      />

      <div
        className={`bg-zinc-900/80 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-zinc-700 hover:${borderColor} transition-colors ${glowShadow} group relative overflow-hidden`}
        style={{ transform: "translateZ(30px)" }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl md:text-3xl font-black text-white group-hover:drop-shadow-lg transition-all">{ach.title}</h3>
            <span className={`text-sm md:text-base font-bold ${textColor} bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 shadow-inner`}>
              {ach.date}
            </span>
          </div>

          <p className="text-zinc-400 text-sm md:text-base leading-relaxed group-hover:text-zinc-300 transition-colors">
            {ach.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  const achievements = [
    {
      title: "IIT Zonals TechFest",
      desc: "We team participated for the line follower and also got selected for finals .",
      date: "2024",
      icon: "🏆"
    },
    {
      title: "Team Challengers",
      desc: "I became a member on team Challengers and work on Web-Development Team",
      date: "2025",
      icon: "🎓"
    },
    {
      title: "Contributor",
      desc: "Worked with seniors,friends and other people . Contributed to their project.",
      date: "Ongoing",
      icon: "⭐"
    }
  ];

  return (
    <section id="achievements" className="py-32 bg-zinc-950 relative overflow-hidden pb-48">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+Cjxwb2x5Z29uIHBvaW50cz0iMCwwIDIsMCAyLDIgMCwyIiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMifS8+Cjwvc3ZnPg==')] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-24 md:text-center flex flex-col items-center"
        >
          <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-600 mb-6 drop-shadow-2xl text-center">
            Hall of Fame
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl text-center">
            Milestones engineered beyond the standard curriculum. A testament to relentless execution and logic.
          </p>
          <div className="w-32 h-2 mt-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.6)]" />
        </motion.div>

        <div className="relative w-full">

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent -translate-x-1/2 shadow-[0_0_20px_rgba(34,211,238,1)] z-0 rounded-full"
          />

          <div className="space-y-16 md:space-y-24">
            {achievements.map((ach, idx) => {
              const isLeft = idx % 2 === 0;
              const glowNode = isLeft ? "border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.8)]" : "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)]";

              return (
                <div key={idx} className={`flex flex-col md:flex-row items-center justify-between w-full ${isLeft ? '' : 'md:flex-row-reverse'}`}>

                  <div className="w-full md:w-5/12 z-10 flex border-l-2 md:border-l-0 border-zinc-800 pl-4 md:pl-0 ml-4 md:ml-0">
                    <AchievementTiltCard ach={ach} isLeft={isLeft} delay={idx * 0.15} />
                  </div>

                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: idx * 0.2 + 0.3 }}
                    className={`hidden md:flex w-16 h-16 rounded-full bg-zinc-950 border-4 ${glowNode} z-20 items-center justify-center text-3xl`}
                  >
                    {ach.icon}
                  </motion.div>

                  <div className="hidden md:block w-5/12" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
