"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";

function CertificateCard({ cert, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className="relative pl-12 mb-12 last:mb-0 group"
    >
      <div className="absolute w-3 h-3 bg-purple-500 rounded-full left-0 top-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(168,85,247,0.8)] group-hover:scale-150 transition-transform duration-300 z-10" />
      <div className="absolute w-[2px] h-full bg-gradient-to-b from-purple-500/50 to-transparent left-[5px] top-1/2 group-last:h-0" />

      <motion.a
        href={cert.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl group-hover:border-purple-500/40 group-hover:bg-zinc-900/60 transition-all duration-500 flex flex-col md:flex-row justify-between items-center shadow-2xl relative overflow-hidden group-hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10 text-center md:text-left">
            <div className="text-[10px] font-black text-purple-400 uppercase tracking-[0.2em] mb-2">{cert.issuer}</div>
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{cert.title}</h3>
            <div className="text-zinc-500 font-medium text-sm md:text-base">Issued: {cert.date}</div>
          </div>

          <div className="mt-6 md:mt-0 relative z-10 p-4 rounded-2xl bg-zinc-800/50 group-hover:bg-purple-500 group-hover:text-black transition-all duration-300 text-zinc-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
        const q = query(collection(db, "certificates"), orderBy("createdAt", "desc"));
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
          className="mb-20 text-center flex flex-col items-center"
        >
          <div className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Official Verification</div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">Credentials</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
        </motion.div>

        <div className="relative min-h-[200px]">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-10 h-10 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
          ) : (
            certs.map((cert, index) => (
              <CertificateCard key={cert.id || index} cert={cert} delay={index * 0.1} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
