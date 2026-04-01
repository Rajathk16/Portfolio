"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("loading");
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-32 relative bg-zinc-950 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6 w-fit">Connectivity</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tight leading-none">Start <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">A Project</span></h2>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-10 max-w-md">
              Whether you have a question or a grand vision, let's execute it with precision and modern logic.
            </p>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Direct Access</div>
                  <div className="font-bold">rajathk16.dev@gmail.com</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 w-full"
          >
            {isMounted && (
              <form onSubmit={handleSubmit} className="bg-zinc-900/40 backdrop-blur-2xl border border-zinc-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-[2.5rem] pointer-events-none" />
                
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="grid md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Ident_Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 font-mono text-sm"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Ident_Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-white focus:border-cyan-500 outline-none transition-all placeholder:text-zinc-600 font-mono text-sm"
                      required
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Protocol_Message: What are we building?"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl text-white focus:border-cyan-500 outline-none transition-all min-h-[150px] placeholder:text-zinc-600 font-mono text-sm"
                    required
                  />

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group relative py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black uppercase tracking-widest text-sm transition-all overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.3)] disabled:opacity-50 disabled:grayscale active:scale-95"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "loading" ? "Executing..." : status === "success" ? "Commit Success ✅" : "Send Protocol 🚀"}
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-16 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3 text-2xl font-black text-white tracking-tighter">
              <span className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">R</span>
              <span>Rajath<span className="text-cyan-500">.</span></span>
            </div>
            <p className="text-zinc-500 font-medium text-sm max-w-xs text-center md:text-left">
              Architecting the next generation of digital systems with logic and creativity.
            </p>
          </div>

          <div className="flex gap-4">
            {[
              { id: 'gh', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"></path></svg>, url: "https://github.com/Rajathk16" },
              { id: 'li', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>, url: "#" }
            ].map(social => (
              <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-300">
                {social.icon}
              </a>
            ))}
          </div>

          <div className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.2em] order-last md:order-none">
            © {new Date().getFullYear()} Build_v1.6_RAJATH
          </div>
        </div>
      </div>
    </footer>
  );
}