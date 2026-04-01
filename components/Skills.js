"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useState, useRef, useMemo } from "react";

const skillsData = [
  {
    id: "frontend",
    label: "Frontend",
    color: "#22d3ee", // cyan-400
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind"]
  },
  {
    id: "backend",
    label: "Backend",
    color: "#a855f7", // purple-500
    skills: ["Firebase", "Node.js", "Express", "Supabase", "SQL"]
  },
  {
    id: "architecture",
    label: "Core",
    color: "#10b981", // emerald-500
    skills: ["DSA (C++)", "IoT (YOLO)", "Cybersecurity", "n8n"]
  }
];

function RadialGraph() {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef(null);

  useAnimationFrame((time) => {
    setRotation(time / 100); // Slow rotation
  });

  const nodes = useMemo(() => {
    const centerX = 400;
    const centerY = 400;
    const innerRadius = 140;
    const outerRadius = 280;

    const categoryNodes = skillsData.map((cat, i) => {
      const angle = (i / skillsData.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * innerRadius;
      const y = centerY + Math.sin(angle) * innerRadius;

      const skillNodes = cat.skills.map((skill, si) => {
        const sAngle = angle - 0.4 + (si / (cat.skills.length - 1)) * 0.8;
        const sx = centerX + Math.cos(sAngle) * outerRadius;
        const sy = centerY + Math.sin(sAngle) * outerRadius;
        return { label: skill, x: sx, y: sy, color: cat.color };
      });

      return {
        ...cat,
        x,
        y,
        skills: skillNodes
      };
    });

    return { centerX, centerY, categoryNodes };
  }, []);

  return (
    <div className="relative w-[800px] h-[800px] scale-[0.6] md:scale-100 origin-center">
      <svg width="800" height="800" className="absolute inset-0 pointer-events-none">
        {nodes.categoryNodes.map((cat) => (
          <g key={cat.id}>
            {/* Curves from center to categories */}
            <motion.path
              d={`M ${nodes.centerX} ${nodes.centerY} Q ${(nodes.centerX + cat.x) / 2 + 20} ${(nodes.centerY + cat.y) / 2 - 20} ${cat.x} ${cat.y}`}
              fill="none"
              stroke={cat.color}
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* Curves from categories to skills */}
            {cat.skills.map((skill, si) => (
              <motion.path
                key={si}
                d={`M ${cat.x} ${cat.y} Q ${(cat.x + skill.x) / 2 + 10} ${(cat.y + skill.y) / 2 - 10} ${skill.x} ${skill.y}`}
                fill="none"
                stroke={cat.color}
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.15 }}
                transition={{ duration: 1, delay: 1 + si * 0.1 }}
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Orbiting Elements Wrapper */}
      <motion.div 
        style={{ rotate: rotation / 2 }}
        className="absolute inset-0"
      >
        {/* Skill Nodes (Orbiting Outer) */}
        {nodes.categoryNodes.map((cat) => (
          cat.skills.map((skill, si) => (
            <div
              key={si}
              style={{ left: skill.x, top: skill.y, transform: `translate(-50%, -50%) rotate(${-(rotation / 2)}deg)` }}
              className="absolute group px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 hover:border-white transition-all duration-300 shadow-xl"
            >
              <div className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-tighter">{skill.label}</div>
              <div className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: skill.color }} />
            </div>
          ))
        ))}

        {/* Category Nodes (Orbiting Inner) */}
        {nodes.categoryNodes.map((cat) => (
          <div
            key={cat.id}
            style={{ left: cat.x, top: cat.y, transform: `translate(-50%, -50%) rotate(${-(rotation / 2)}deg)` }}
            className="absolute p-6 rounded-full bg-zinc-900 border-2 border-zinc-700 shadow-2xl flex flex-col items-center justify-center min-w-[100px] group transition-all hover:scale-110"
          >
            <div className="text-sm font-black uppercase tracking-widest text-white">{cat.label}</div>
            <div className="w-8 h-1 rounded-full mt-2" style={{ backgroundColor: cat.color }} />
            <div className="absolute inset-0 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-60" style={{ backgroundColor: cat.color }} />
          </div>
        ))}
      </motion.div>

      {/* Central Root (Fixed Center within the rotating frame, counters rotation to stay upright) */}
      <div 
        style={{ left: nodes.centerX, top: nodes.centerY, transform: "translate(-50%, -50%)" }}
        className="absolute z-50 p-10 rounded-full bg-zinc-950 border-4 border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] flex items-center justify-center"
      >
        <div className="text-2xl font-black text-white uppercase tracking-[0.3em] flex flex-col items-center">
          <span className="text-cyan-400">Core</span>
          <span>Stack</span>
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-10 bg-white" />
      </div>
    </div>
  );
}

function MobileSkills() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-md mx-auto">
      {skillsData.map((cat) => (
        <div key={cat.id} className="bg-zinc-900/60 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800 shadow-2xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{cat.label}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {cat.skills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-zinc-800/80 text-zinc-300 rounded-lg text-xs font-bold border border-zinc-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-zinc-950 relative overflow-hidden min-h-screen flex items-center justify-center">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 mx-auto w-fit">Knowledge Base</div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Skill Graph</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Desktop Radial Graph */}
        <div className="hidden lg:flex justify-center items-center h-[700px] w-full">
          <RadialGraph />
        </div>

        {/* Mobile Minimal List */}
        <div className="lg:hidden w-full">
          <MobileSkills />
        </div>
      </div>
    </section>
  );
}
