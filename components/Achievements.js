"use client";

import { motion, useAnimationFrame } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

function AchievementNode({ ach, x, y, index, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring" }}
      style={{ left: x, top: y, translate: "-50% -50%" }}
      className="absolute z-30 group cursor-default"
    >
      <div className="relative p-6 rounded-[2rem] bg-zinc-900/60 backdrop-blur-3xl border border-white/5 shadow-2xl w-[260px] group-hover:border-purple-500/30 transition-all duration-500">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl shadow-inner group-hover:bg-purple-500/10 group-hover:border-purple-500/50 transition-all">
            {ach.icon || "🏆"}
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-purple-400 uppercase tracking-widest">{ach.date}</span>
            <h3 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-purple-400 transition-colors">{ach.title}</h3>
          </div>
        </div>
        <p className="text-zinc-500 text-[11px] font-medium leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">{ach.desc}</p>
        
        <div className="absolute inset-0 rounded-[2rem] bg-purple-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
      </div>
      
      {/* Connector Point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] -z-10" />
    </motion.div>
  );
}

function AchievementWeb({ achievements }) {
  const [rotation, setRotation] = useState(0);
  const centerX = 500;
  const centerY = 450;
  
  useAnimationFrame((time) => {
    setRotation(time / 250);
  });

  const nodes = useMemo(() => {
    return achievements.map((ach, i) => {
      const radius = 280 + (i % 2 === 0 ? 40 : -40);
      const angle = (i / achievements.length) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      return { ...ach, x, y };
    });
  }, [achievements]);

  return (
    <div className="relative w-[1000px] h-[900px] scale-[0.5] lg:scale-[0.85] origin-center -my-32">
      <svg width="1000" height="900" className="absolute inset-0 pointer-events-none">
        {nodes.map((node, i) => {
          // Circuit-style connections
          const nextNode = nodes[(i + 1) % nodes.length];
          return (
            <g key={i}>
              <motion.path
                d={`M ${centerX} ${centerY} L ${node.x} ${node.y}`}
                stroke="rgba(168, 85, 247, 0.15)"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
              <motion.path
                d={`M ${node.x} ${node.y} L ${nextNode.x} ${nextNode.y}`}
                stroke="rgba(168, 85, 247, 0.05)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, delay: i * 0.3 }}
              />
            </g>
          );
        })}
      </svg>

      <motion.div style={{ rotate: rotation / 2 }} className="absolute inset-0">
        {nodes.map((node, i) => (
          <div key={node.id || i} style={{ position: "absolute", left: node.x, top: node.y, transform: `translate(-50%, -50%) rotate(${-(rotation / 2)}deg)` }}>
            <AchievementNode ach={node} index={i} />
          </div>
        ))}
      </motion.div>

      {/* Central Success Node */}
      <div 
        style={{ left: centerX, top: centerY, transform: "translate(-50%, -50%)" }}
        className="absolute z-50 w-32 h-32 rounded-full bg-zinc-950 border-4 border-purple-500/30 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(168,85,247,0.15)]"
      >
        <div className="text-xl font-black text-white uppercase tracking-widest text-center leading-tight">
          <span className="text-purple-400">Hall</span><br/>of Fame
        </div>
        <div className="absolute inset-0 rounded-full border-4 border-purple-500/10 animate-ping" />
      </div>
    </div>
  );
}

function MobileAchievements({ achievements }) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-md mx-auto relative z-10 px-4">
      {achievements.map((ach, idx) => (
        <motion.div
            key={ach.id || idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 shadow-2xl overflow-hidden group"
        >
            <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl">{ach.icon || "🏆"}</div>
                <div>
                    <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{ach.date}</span>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">{ach.title}</h3>
                </div>
            </div>
            <p className="text-zinc-500 text-sm">{ach.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function Achievements() {
  const [achievementsList, setAchievementsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const q = query(collection(db, "achievements"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length === 0) {
          setAchievementsList([
            { title: "IIT Zonals TechFest", desc: "Qualified for the finals in line follower competition.", date: "2024", icon: "🏆" },
            { title: "Team Challengers", desc: "Core Web Dev contributor handling high-impact logic.", date: "2025", icon: "🎓" },
            { title: "Open Source", desc: "Actively contributing to diverse projects globally.", date: "Ongoing", icon: "⭐" }
          ]);
        } else {
          setAchievementsList(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <section id="achievements" className="py-32 bg-zinc-950 relative overflow-hidden min-h-screen flex flex-col items-center">
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4 mx-auto w-fit">Milestone Tracker</div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight">The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Neural Net</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full" />
        </motion.div>

        {loading ? (
          <div className="py-20 flex justify-center"><div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" /></div>
        ) : (
          <>
            <div className="hidden lg:flex justify-center items-center h-[800px] w-full mt-10">
              <AchievementWeb achievements={achievementsList} />
            </div>
            <div className="lg:hidden w-full mt-12">
              <MobileAchievements achievements={achievementsList} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
