"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

function ProjectNode({ proj, x, y, angle, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      style={{ left: x, top: y, translate: "-50% -50%" }}
      className="absolute z-30 group"
    >
      <div className="relative p-6 rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-3xl border border-white/5 shadow-2xl w-[280px] md:w-[320px] group-hover:border-white/20 transition-all duration-500 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${proj.bgGradient} opacity-5 group-hover:opacity-20 transition-opacity`} />
        
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div className="text-4xl filter drop-shadow-lg">{proj.icon}</div>
          <div className="flex gap-2">
            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all border border-zinc-700">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>
            </a>
            <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-zinc-950 transition-all border border-cyan-500/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4" strokeWidth="3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>

        <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight relative z-10 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
        <p className="text-zinc-500 text-xs font-medium leading-relaxed mb-4 relative z-10 line-clamp-2 md:line-clamp-none">{proj.desc}</p>
        
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {(proj.tags || []).slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-zinc-800/80 text-[9px] font-black text-zinc-400 rounded border border-zinc-700/50 uppercase tracking-widest">{tag}</span>
          ))}
          {proj.tags?.length > 3 && <span className="text-[9px] text-zinc-600 font-bold">+{proj.tags.length - 3}</span>}
        </div>
      </div>
      
      {/* Node Pointer (Small Dot) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500 border-2 border-white shadow-[0_0_15px_rgba(6,182,212,0.8)] -z-10 group-hover:scale-150 transition-transform" />
    </motion.div>
  );
}

function RadialProjectsGraph({ projects }) {
  const [rotation, setRotation] = useState(0);
  const centerX = 500;
  const centerY = 500;
  const orbitRadius = 350;

  useAnimationFrame((time) => {
    setRotation(time / 200);
  });

  const processedNodes = useMemo(() => {
    return projects.map((proj, i) => {
      const angle = (i / projects.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * orbitRadius;
      const y = centerY + Math.sin(angle) * orbitRadius;
      return { ...proj, x, y, angle };
    });
  }, [projects]);

  return (
    <div className="relative w-[1000px] h-[1000px] scale-[0.45] lg:scale-[0.8] origin-center -my-40">
      <svg width="1000" height="1000" className="absolute inset-0 pointer-events-none">
        {processedNodes.map((node, i) => (
          <motion.path
            key={i}
            d={`M ${centerX} ${centerY} L ${node.x} ${node.y}`}
            fill="none"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="2"
            strokeDasharray="10,10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </svg>

      <motion.div style={{ rotate: rotation }} className="absolute inset-0">
        {processedNodes.map((node, i) => (
          <div key={node.id} style={{ position: "absolute", left: node.x, top: node.y, transform: `translate(-50%, -50%) rotate(${-rotation}deg)` }}>
            <ProjectNode proj={node} index={i} />
          </div>
        ))}
      </motion.div>

      {/* Center Hub */}
      <div 
        style={{ left: centerX, top: centerY, transform: "translate(-50%, -50%)" }}
        className="absolute z-50 p-12 rounded-full bg-zinc-950 border-4 border-cyan-500/30 flex flex-col items-center justify-center shadow-[0_0_100px_rgba(6,182,212,0.1)]"
      >
        <div className="text-3xl font-black text-white uppercase tracking-[0.2em] flex flex-col items-center">
          <span className="text-cyan-400">PROD</span>
          <span>REPO</span>
        </div>
        <div className="absolute inset-0 rounded-full bg-cyan-500/10 animate-pulse blur-xl" />
      </div>
    </div>
  );
}

function MobileProjectsList({ projects }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto relative z-10 px-4">
      {projects.map((proj, idx) => (
        <motion.div
            key={proj.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 shadow-2xl overflow-hidden group"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${proj.bgGradient} opacity-5`} />
            <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="text-4xl">{proj.icon}</div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">{proj.title}</h3>
            </div>
            <p className="text-zinc-500 text-sm mb-6 relative z-10">{proj.desc}</p>
            <div className="flex gap-4 relative z-10">
                <a href={proj.githubUrl} className="flex-1 py-3 bg-zinc-800 text-center rounded-xl text-white font-bold text-xs">Source</a>
                <a href={proj.demoUrl} className="flex-1 py-3 bg-cyan-600 text-center rounded-xl text-black font-black text-xs">Launch App</a>
            </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length === 0) {
          setProjectsList([
            { id: "1", title: "Restan -Next.js", desc: "A fully Cloned Static website of Restaurant successfully deployed.", tags: ["Auth", "Tailwind", "React"], githubUrl: "https://github.com/Rajathk16", demoUrl: "https://restaurantmile1.vercel.app/", bgGradient: "from-cyan-500/20 to-blue-600/20", icon: "🍽️" },
            { id: "2", title: "SpecCheck", desc: "Contract Analyser which usually help users to understand the contract.", tags: ["Gemini", "Node.js", "Zustand"], githubUrl: "https://github.com/Rajathk16", demoUrl: "https://specchek-one.vercel.app/", bgGradient: "from-purple-500/20 to-pink-600/20", icon: "👨‍💻" }
          ]);
        } else {
          setProjectsList(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-32 bg-zinc-950 relative overflow-hidden min-h-screen flex flex-col items-center">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 mx-auto w-fit">Deployment Cluster</div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Nodes</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {loading ? (
          <div className="py-20 flex justify-center"><div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" /></div>
        ) : (
          <>
            <div className="hidden lg:flex justify-center items-center h-[800px] w-full">
              <RadialProjectsGraph projects={projectsList} />
            </div>
            <div className="lg:hidden w-full mt-12">
              <MobileProjectsList projects={projectsList} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
