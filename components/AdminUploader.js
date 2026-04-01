"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminUploader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState("projects");
  const [status, setStatus] = useState("idle");
  const [itemsList, setItemsList] = useState([]);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "", desc: "", tags: "", githubUrl: "", demoUrl: "", bgGradient: "", icon: "",
    issuer: "", date: "", fileUrl: ""
  });

  const ADMIN_PASSWORD = "rajath16";

  useEffect(() => {
    if (isAuthenticated) {
      fetchItems();
    }
  }, [isAuthenticated, type]);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, type), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItemsList(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Access Code");
      setPassword("");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      title: item.title || "",
      desc: item.desc || "",
      tags: item.tags ? item.tags.join(", ") : "",
      githubUrl: item.githubUrl || "",
      demoUrl: item.demoUrl || "",
      bgGradient: item.bgGradient || "",
      icon: item.icon || "",
      issuer: item.issuer || "",
      date: item.date || "",
      fileUrl: item.fileUrl || ""
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirm deletion of record?")) return;
    try {
      await deleteDoc(doc(db, type, id));
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const data = {
        title: formData.title,
        updatedAt: serverTimestamp()
      };

      if (type === "projects") {
        Object.assign(data, {
          desc: formData.desc,
          tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
          githubUrl: formData.githubUrl,
          demoUrl: formData.demoUrl,
          bgGradient: formData.bgGradient || "from-cyan-500/20 to-blue-600/20",
          icon: formData.icon || "💻"
        });
      } else if (type === "certificates") {
        Object.assign(data, {
          issuer: formData.issuer,
          date: formData.date,
          fileUrl: formData.fileUrl
        });
      } else if (type === "achievements") {
        Object.assign(data, {
          desc: formData.desc,
          date: formData.date,
          icon: formData.icon || "🏆"
        });
      }

      if (editId) {
        await updateDoc(doc(db, type, editId), data);
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, type), data);
      }

      setStatus("success");
      setEditId(null);
      setFormData({
        title: "", desc: "", tags: "", githubUrl: "", demoUrl: "", bgGradient: "", icon: "",
        issuer: "", date: "", fileUrl: ""
      });
      setTimeout(() => setStatus("idle"), 2000);
      fetchItems();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const closeTerminal = () => {
    setIsOpen(false);
    setIsAuthenticated(false);
    setPassword("");
    setEditId(null);
  };

  return (
    <>
      {/* Trigger Move to Top Left */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-[100] p-2.5 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 text-zinc-600 hover:text-cyan-400 hover:border-cyan-500/30 transition-all shadow-xl active:scale-95 group rounded-xl"
      >
        <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-zinc-950/80 backdrop-blur-3xl p-6 md:p-12 font-mono"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-cyan-500/5 blur-[200px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto h-full flex flex-col relative z-20">
              {/* Header */}
              <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 rounded bg-cyan-500 text-black font-black text-[10px] tracking-widest uppercase">System Control</div>
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap">Dashboard_v2.0</h2>
                </div>
                <button onClick={closeTerminal} className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-500 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              {!isAuthenticated ? (
                <div className="flex-grow flex items-center justify-center">
                  <form onSubmit={handleAuth} className="w-full max-w-md bg-zinc-900/50 p-12 rounded-[2.5rem] border border-zinc-800 shadow-2xl flex flex-col gap-6 text-center">
                    <div className="text-zinc-500 text-xs uppercase tracking-widest mb-2 font-black">Auth Protocol Required</div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="SYS_ACCESS_KEY"
                      className="bg-zinc-950 border border-zinc-800 p-5 rounded-2xl text-white focus:border-cyan-500 outline-none text-center tracking-[1em] font-mono"
                      autoFocus
                    />
                    <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-black py-5 rounded-2xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">INITIALIZE_SESSION</button>
                  </form>
                </div>
              ) : (
                <div className="flex-grow flex flex-col lg:flex-row gap-10 overflow-hidden pb-10">
                  {/* Sidebar Toggles */}
                  <div className="lg:w-1/4 flex flex-col gap-4">
                    <div className="bg-zinc-900/40 border border-zinc-800 p-2 rounded-2xl flex flex-col gap-1">
                      {["projects", "certificates", "achievements"].map((t) => (
                        <button 
                          key={t}
                          onClick={() => { setType(t); setEditId(null); }} 
                          className={`w-full py-4 px-6 rounded-xl text-left capitalize transition-all flex justify-between items-center ${type === t ? "bg-cyan-500 text-zinc-950 font-black shadow-lg" : "text-zinc-500 hover:bg-zinc-800"}`}
                        >
                          {t}
                          <span className="text-[10px] opacity-60">ID: {t.slice(0, 3)}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl">
                      <div className="text-[10px] text-zinc-600 uppercase mb-4 font-black tracking-widest">Active State</div>
                      <div className="text-white text-sm font-bold flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                        Connected to DB_PROD
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area - Side by Side */}
                  <div className="flex-grow flex flex-col md:flex-row gap-10 overflow-hidden">
                    {/* Left Panel: Form */}
                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem]">
                        <div className="flex justify-between items-center mb-8">
                          <h3 className="text-xl font-black text-white uppercase tracking-tighter">{editId ? `Patch_${type}_Entry` : `Append_${type}_Data`}</h3>
                          {editId && <button onClick={() => { setEditId(null); setFormData({ title: "", desc: "", tags: "", githubUrl: "", demoUrl: "", bgGradient: "", icon: "", issuer: "", date: "", fileUrl: "" }); }} className="text-orange-500 text-xs font-black hover:underline">[CANCEL_EDIT]</button>}
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Entry_Title</label>
                            <input name="title" value={formData.title} onChange={handleChange} placeholder="Protocol Name" required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none font-mono" />
                          </div>
                          
                          {type === "projects" && (
                            <>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Manifest_Details</label>
                                <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="System architecture summary..." required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none min-h-[120px]" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Stack_Tags</label>
                                  <input name="tags" value={formData.tags} onChange={handleChange} placeholder="React, Node, etc." className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none font-mono" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Glyph_Icon</label>
                                  <input name="icon" value={formData.icon} onChange={handleChange} placeholder="💻" className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none font-mono" />
                                </div>
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Source_Endpoint</label>
                                <input name="githubUrl" value={formData.githubUrl} onChange={handleChange} placeholder="https://github.com/..." className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none font-mono" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Deploy_Endpoint</label>
                                <input name="demoUrl" value={formData.demoUrl} onChange={handleChange} placeholder="https://demo..." className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-cyan-500 outline-none font-mono" />
                              </div>
                            </>
                          )}

                          {type === "certificates" && (
                            <>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Issuing_Node</label>
                                <input name="issuer" value={formData.issuer} onChange={handleChange} placeholder="Organization ID" required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-purple-500 outline-none" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Timestamp</label>
                                <input name="date" value={formData.date} onChange={handleChange} placeholder="2025" required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-purple-500 outline-none" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Link_Reference</label>
                                <input name="fileUrl" value={formData.fileUrl} onChange={handleChange} placeholder="https://..." required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-purple-500 outline-none" />
                              </div>
                            </>
                          )}

                          {type === "achievements" && (
                            <>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Achievement_Logs</label>
                                <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Mission critical success details..." required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-emerald-500 outline-none min-h-[120px]" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Timestamp</label>
                                <input name="date" value={formData.date} onChange={handleChange} placeholder="2025" required className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-emerald-500 outline-none" />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] text-zinc-500 uppercase font-black px-1">Medal_Glyph</label>
                                <input name="icon" value={formData.icon} onChange={handleChange} placeholder="🏆" className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-white focus:border-emerald-500 outline-none" />
                              </div>
                            </>
                          )}

                          <button type="submit" disabled={status === "loading"} className={`py-5 rounded-2xl font-black mt-4 transition-all active:scale-95 shadow-2xl uppercase tracking-[0.2em] ${status === "loading" ? "bg-zinc-700 text-zinc-500" : editId ? "bg-orange-500 text-white" : "bg-cyan-500 text-zinc-950"}`}>
                            {status === "loading" ? "EXECUTING_PUSH..." : status === "success" ? "COMMIT_COMPLETE" : status === "error" ? "RUNTIME_ERROR" : editId ? "PATCH_RECORD" : "COMMIT_NEW_RECORD"}
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Right Panel: List Management */}
                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                      <div className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] min-h-full">
                        <div className="text-[10px] text-zinc-600 uppercase mb-8 font-black tracking-widest flex items-center gap-2">
                          Manage_Repository_Stream 
                          <span className="bg-zinc-800 px-2 rounded text-zinc-400">{itemsList.length} Units</span>
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          {itemsList.length === 0 ? (
                            <div className="text-center py-20 text-zinc-700 border-2 border-dashed border-zinc-900 rounded-2xl font-mono">NULL_POINTER: Repository Empty</div>
                          ) : (
                            itemsList.map((item) => (
                              <div key={item.id} className="bg-zinc-950 border border-zinc-900 p-5 rounded-[1.5rem] flex justify-between items-center group hover:border-zinc-700 hover:bg-zinc-900/50 transition-all">
                                <div className="flex flex-col overflow-hidden">
                                  <span className="text-white font-bold truncate group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{item.title}</span>
                                  <span className="text-[9px] text-zinc-600 mt-1 font-mono uppercase truncate">{item.issuer || item.date || item.id}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={() => handleEdit(item)} className="p-3 bg-zinc-900 text-zinc-500 hover:text-orange-400 hover:bg-orange-400/10 rounded-xl transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                                  </button>
                                  <button onClick={() => handleDelete(item.id)} className="p-3 bg-zinc-900 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


