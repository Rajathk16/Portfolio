"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AdminUploader() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("projects");
  const [status, setStatus] = useState("idle");
  
  const [formData, setFormData] = useState({
    title: "", desc: "", tags: "", githubUrl: "", demoUrl: "", bgGradient: "", icon: "",
    issuer: "", date: "", fileUrl: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      if (type === "projects") {
        await addDoc(collection(db, "projects"), {
          title: formData.title,
          desc: formData.desc,
          tags: formData.tags.split(",").map(t => t.trim()),
          githubUrl: formData.githubUrl,
          demoUrl: formData.demoUrl,
          bgGradient: formData.bgGradient || "from-cyan-500/20 to-blue-600/20",
          icon: formData.icon || "💻",
          createdAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, "certificates"), {
          title: formData.title,
          issuer: formData.issuer,
          date: formData.date,
          fileUrl: formData.fileUrl,
          createdAt: serverTimestamp()
        });
      }

      setStatus("success");
      setFormData({
        title: "", desc: "", tags: "", githubUrl: "", demoUrl: "", bgGradient: "", icon: "",
        issuer: "", date: "", fileUrl: ""
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 w-10 h-10 bg-zinc-900 border border-zinc-700 text-zinc-500 rounded-full flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500 transition-colors shadow-lg"
        title="Admin addDoc Terminal"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-16 left-4 z-50 w-80 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700 rounded-xl shadow-2xl overflow-hidden font-mono text-sm max-h-[80vh] flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-zinc-800 bg-zinc-950">
        <span className="text-cyan-400 font-black">Sys_addDoc()</span>
        <button onClick={() => setIsOpen(false)} className="text-red-400 hover:text-red-300">X</button>
      </div>
      
      <div className="p-4 overflow-y-auto custom-scrollbar flex-grow">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setType("projects")} className={`flex-1 py-1 rounded ${type === "projects" ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50" : "bg-zinc-800 text-zinc-400"}`}>Project</button>
          <button onClick={() => setType("certificates")} className={`flex-1 py-1 rounded ${type === "certificates" ? "bg-purple-500/20 text-purple-400 border border-purple-500/50" : "bg-zinc-800 text-zinc-400"}`}>Certificate</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none" />
          
          {type === "projects" ? (
            <>
              <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" required className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none" />
              <input name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none" />
              <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="GitHub URL" className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none" />
              <input name="demoUrl" value={formData.demoUrl} onChange={handleChange} placeholder="Demo URL" className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none" />
              <input name="icon" value={formData.icon} onChange={handleChange} placeholder="Emoji Icon (e.g. 💻)" className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-cyan-500 outline-none" />
            </>
          ) : (
            <>
              <input name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Issuer" required className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-purple-500 outline-none" />
              <input name="date" value={formData.date} onChange={handleChange} placeholder="Date/Year" required className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-purple-500 outline-none" />
              <input name="fileUrl" value={formData.fileUrl} onChange={handleChange} placeholder="File URL / PDF path" required className="bg-zinc-950 border border-zinc-800 p-2 rounded text-white focus:border-purple-500 outline-none" />
            </>
          )}

          <button type="submit" disabled={status === "loading"} className={`py-2 rounded font-black mt-2 ${type === "projects" ? "bg-cyan-500 text-black hover:bg-cyan-400" : "bg-purple-500 text-black hover:bg-purple-400"}`}>
            {status === "loading" ? "UPLOADING..." : status === "success" ? "DONE" : status === "error" ? "ERROR" : "RUN addDoc()"}
          </button>
        </form>
      </div>
    </div>
  );
}
