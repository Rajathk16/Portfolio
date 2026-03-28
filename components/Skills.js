"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";

const skillsData = {
  id: "skills", label: "Core Protocol",
  children: [
    {
      id: "frontend", label: "Frontend",
      children: [
        { id: "html", label: "HTML5" },
        { id: "css", label: "CSS3" },
        { id: "js", label: "JavaScript" },
        { id: "react", label: "React" },
        { id: "tailwind", label: "Tailwind" },
        { id: "framer", label: "Framer" },
      ]
    },
    {
      id: "database", label: "Database",
      children: [
        { id: "firebase", label: "Firebase" },
        { id: "supabase", label: "Supabase" },
      ]
    },
    {
      id: "others", label: "Architecture",
      children: [
        { id: "dsa", label: "Data Structures", children: [{ id: "cpp", label: "C++" }] },
        { id: "cybersecurity", label: "Cybersecurity" },
        { id: "ai", label: "AI", children: [{ id: "n8n", label: "n8n" }] },
        { id: "iot", label: "IoT", children: [{ id: "yolo", label: "YOLO" }] },
      ]
    }
  ]
};

const TreeNode = ({ node, isRoot }) => {
  const [isOpen, setIsOpen] = useState(isRoot);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center relative z-20">
      <motion.button
        layout
        drag
        dragConstraints={{ left: -40, right: 40, top: -40, bottom: 40 }}
        dragElastic={0.4}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        whileHover={{ scale: 1.15, textShadow: "0px 0px 15px rgb(34,211,238)" }}
        whileTap={{ scale: 0.9, cursor: "grabbing" }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`relative z-30 px-6 py-3 rounded-full border-4 cursor-grab transition-colors font-black uppercase tracking-wider whitespace-nowrap shadow-2xl ${isOpen && hasChildren
            ? "border-cyan-400 bg-cyan-950 text-white shadow-[0_0_30px_rgba(34,211,238,0.8)]"
            : hasChildren
              ? "border-zinc-500 bg-zinc-900 text-zinc-300 hover:border-cyan-500 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              : "border-purple-500 bg-purple-950 text-white shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:bg-purple-800"
          }`}
      >
        {node.label}
        {hasChildren && (
          <span className={`ml-3 text-xs opacity-70 transition-transform inline-block ${isOpen ? "rotate-180 text-cyan-300" : "rotate-0 text-zinc-400"}`}>
            ▼
          </span>
        )}

        {isOpen && hasChildren && <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full -z-10 animate-pulse" />}
      </motion.button>

      <AnimatePresence>
        {hasChildren && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scaleY: 0 }}
            animate={{ opacity: 1, height: "auto", scaleY: 1 }}
            exit={{ opacity: 0, height: 0, scaleY: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center mt-8 relative w-full origin-top"
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute -top-8 w-1.5 h-8 bg-gradient-to-b from-cyan-400 to-cyan-700 origin-top rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] z-10"
            />

            {node.children.length > 1 && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-0 left-[8%] right-[8%] h-1.5 bg-cyan-700 origin-center rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
              />
            )}

            <div className="flex flex-wrap justify-center gap-x-14 gap-y-16 pt-8 pb-4 px-6 relative w-full">
              {node.children.map((child, idx) => (
                <div key={child.id} className="relative flex flex-col items-center z-20">
                  {node.children.length > 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="absolute -top-8 w-1.5 h-8 bg-cyan-700 origin-top rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10"
                    />
                  )}
                  {node.children.length > 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="absolute -top-[2.2rem] w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-[0_0_20px_rgba(34,211,238,1)] z-30"
                    />
                  )}
                  <TreeNode node={child} isRoot={false} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Skills() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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
      id="skills"
      className="py-32 bg-zinc-950 overflow-hidden min-h-screen flex flex-col justify-center relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", scale: 1.2 }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(34,211,238,0.2) 2px, transparent 2px), linear-gradient(90deg, rgba(34,211,238,0.2) 2px, transparent 2px)", backgroundSize: "60px 60px", transform: "translateZ(-100px)" }} />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(9,9,11,1)_70%)] pointer-events-none z-10" />

      <div className="container mx-auto px-4 relative z-20 w-full overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          style={{ transform: "translateZ(50px)" }}
          className="mb-20 text-center"
        >
          <div className="inline-block px-4 py-1 border border-purple-500/30 rounded-full bg-purple-500/10 text-purple-400 font-bold uppercase tracking-widest text-sm mb-4">
            Interactive Node Mapping
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-wider drop-shadow-2xl">
            Skill <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">Network</span>
          </h2>
          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto font-mono opacity-80 backdrop-blur-sm bg-zinc-900/50 p-4 rounded-xl border border-zinc-700/50 shadow-xl">
            [ Grab & Drag the nodes to test physics ]
          </p>
        </motion.div>

        <div className="w-full flex justify-center mt-12 py-12 px-2 overflow-x-auto overflow-y-hidden min-h-[60vh] items-start custom-scrollbar">
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative p-12 md:p-24 rounded-[3rem] bg-zinc-900/20 border-2 border-cyan-500/30 shadow-[0_0_100px_rgba(6,182,212,0.15)] backdrop-blur-2xl min-w-max"
          >
            <div style={{ transform: "translateZ(-20px)" }} className="absolute inset-0 bg-cyan-500/5 rounded-[3rem] shadow-inner pointer-events-none" />

            <div style={{ transform: "translateZ(80px)" }}>
              <TreeNode node={skillsData} isRoot={true} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
