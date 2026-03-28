"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";

function TiltCert({ cert, delay }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className="relative pl-8 mb-10 last:mb-0 group perspective-1000"
    >
      <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[9px] top-4 shadow-[0_0_10px_rgba(168,85,247,0.6)] group-hover:scale-125 group-hover:bg-purple-400 transition-all z-10" />

      <motion.a
        href={cert.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block outline-none"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div style={{ transform: "translateZ(20px)" }} className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800 p-6 rounded-2xl group-hover:border-purple-500/50 hover:bg-zinc-900 transition-all flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors drop-shadow-md">{cert.title}</h3>
            <div className="flex flex-wrap items-center text-sm md:text-base text-zinc-400 font-medium">
              <span className="text-purple-400">{cert.issuer}</span>
              <span className="mx-2 hidden md:inline">&bull;</span>
              <span className="block md:inline w-full md:w-auto mt-1 md:mt-0">{cert.date}</span>
            </div>
          </div>

          <div className="text-zinc-600 group-hover:text-purple-500 transition-colors mt-4 md:mt-0 relative z-10 self-end md:self-auto" style={{ transform: "translateZ(30px)" }}>
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const q = query(collection(db, "certificates"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (data.length === 0) {
          setCerts([
            { id: "c1", title: "India AI Impact Buildathon", issuer: "GUVI HCL", date: "2026", fileUrl: "#" },
            { id: "c2", title: "Problem solving in C", issuer: "NPTEL", date: "2025", fileUrl: "#" }
          ]);
        } else {
          setCerts(data);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCerts();
  }, []);

  return (
    <section id="certificates" className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Credentials</h2>
          <div className="w-24 h-1.5 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
        </motion.div>

        <div className="relative border-l-2 border-zinc-800 ml-4 py-4 min-h-[200px]">
          {loading ? (
            <div className="flex justify-center items-center h-32 ml-8">
              <div className="w-8 h-8 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
          ) : (
            certs.map((cert, index) => (
              <TiltCert key={cert.id || index} cert={cert} delay={index * 0.1} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
