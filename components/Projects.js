"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";
function TiltCard({ proj, delay }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 15, delay }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full perspective-1000"
    >
      <div
        className="h-full rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden flex flex-col shadow-2xl transition-colors group-hover:border-cyan-500/50"
        style={{ transform: "translateZ(30px)" }}
      >
        <div className={`h-52 w-full bg-gradient-to-br ${proj.bgGradient} relative overflow-hidden flex items-center justify-center border-b border-zinc-800/50`}>
          <motion.div
            style={{ transform: "translateZ(60px)" }}
            className="text-8xl filter drop-shadow-2xl opacity-80 group-hover:opacity-100 transition-opacity absolute"
          >
            {proj.icon}
          </motion.div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
        </div>

        <div className="p-8 flex flex-col flex-grow relative" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{proj.title}</h3>
          <p className="text-zinc-400 text-base mb-6 flex-grow leading-relaxed">{proj.desc}</p>

          <div className="flex flex-wrap gap-2 mb-8" style={{ transform: "translateZ(20px)" }}>
            {proj.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-zinc-800 text-cyan-300 rounded-md text-xs font-semibold uppercase tracking-wider border border-zinc-700">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4 mt-auto pt-4 border-t border-zinc-800/50" style={{ transform: "translateZ(50px)" }}>
            <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors border border-zinc-700 hover:border-zinc-500 group/btn shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover/btn:scale-110 transition-transform"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>
              Source
            </a>
            <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold transition-all border border-cyan-400 group/btn shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5 group-hover/btn:scale-110 transition-transform" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, "projects"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length === 0) {
          // Fallback initial data in case db is empty
          setProjectsList([
            {
              id: "1",
              title: "Restan -Next.js Website",
              desc: "A fully Cloned Static website of Restaurant successfully deployed. ",
              tags: ["Auth context", "Tailwind", "React", "Firebase"],
              githubUrl: "https://github.com/Rajathk16/milestone_1_next.js",
              demoUrl: "https://restaurantmile1.vercel.app/",
              bgGradient: "from-cyan-500/20 to-blue-600/20",
              icon: "🍽️"
            },
            {
              id: "2",
              title: "SpecCheck",
              desc: "Contract Analyser which usually help users to understand the contract in a simple and easy way.",
              tags: ["Gemini integrated", "Node.js", "React", "Firebase,Zustand"],
              githubUrl: "https://github.com/Rajathk16/specchek1_dep",
              demoUrl: "https://specchek-one.vercel.app/",
              bgGradient: "from-purple-500/20 to-pink-600/20",
              icon: "👨‍💻"
            }
          ]);
        } else {
          setProjectsList(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-zinc-950 sm:perspective-1000">
      <div className="container mx-auto px-6 relative z-10" style={{ transformStyle: "preserve-3d" }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-20 md:text-center"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Featured <span className="text-cyan-400">Projects</span></h2>
          <div className="w-24 h-1.5 bg-cyan-500 mx-auto rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 min-h-[400px]">
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            </div>
          ) : (
            projectsList.map((proj, idx) => (
              <TiltCard key={proj.id || idx} proj={proj} delay={idx * 0.1} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
