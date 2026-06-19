import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Plus, Trash2, Edit2, X, Quote } from "lucide-react";

import { motion } from "motion/react";
export default function AdminTestimonials() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "testimonials"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setQuote("");
    setAuthor("");
    setRole("");
    setCurrentId(null);
    setIsEditing(false);
  };

  const handleEdit = (item: any) => {
    setQuote(item.quote);
    setAuthor(item.author);
    setRole(item.role);
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await deleteDoc(doc(db, "testimonials", id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { quote, author, role };
    if (currentId) {
      await updateDoc(doc(db, "testimonials", currentId), data);
    } else {
      await addDoc(collection(db, "testimonials"), data);
    }
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-serif text-brand-gold mb-2">
            Depoimentos
          </h2>
          <p className="text-white/60 text-sm font-sans">Gerencie as avaliações dos seus clientes.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-brand-gold text-brand-navy px-5 py-3 text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all rounded-sm"
          >
            <Plus size={16} /> Novo Depoimento
          </button>
        )}
      </div>

      {isEditing ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#071B33] p-8 border border-brand-gold/30 mb-8 rounded-sm shadow-xl"
        >
          <div className="flex justify-between items-center mb-8 border-b border-brand-gold/10 pb-4">
            <h3 className="text-brand-gold font-serif text-xl">
              {currentId ? "Editar Depoimento" : "Inserir Depoimento"}
            </h3>
            <button
              onClick={resetForm}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                Texto do Depoimento
              </label>
              <textarea
                required
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={4}
                className="w-full bg-[#051325] border border-brand-gold/20 p-4 text-brand-gold/90 text-lg font-serif italic outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner resize-none"
                placeholder="Trabalhar com o Marcos foi incrível..."
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  Nome do Autor
                </label>
                <input
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  Cargo Ou Profissão
                </label>
                <input
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                  placeholder="Ex: Autor Independente"
                />
              </div>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-brand-gold text-brand-navy px-8 py-3 text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all rounded-sm"
              >
                {currentId ? "Salvar Alterações" : "Publicar Depoimento"}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
             <p className="text-white/50 text-sm flex items-center gap-2"><span className="animate-spin inline-block w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full"></span> Carregando depoimentos...</p>
          ) : (
            items.map((item) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={item.id}
                className="bg-[#071B33] border border-brand-gold/20 p-8 flex flex-col justify-between rounded-sm relative"
              >
                <Quote className="text-brand-gold/10 w-16 h-16 absolute top-6 right-6" />
                <div className="relative z-10">
                  <p className="font-serif italic text-white/80 text-lg mb-8 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-brand-gold/10">
                  <div>
                    <p className="font-serif text-brand-gold text-lg">{item.author}</p>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                      {item.role}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-white/30 hover:text-brand-gold transition-colors p-2 bg-[#051325] rounded-full"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-white/30 hover:text-red-400 transition-colors p-2 bg-[#051325] rounded-full"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed border-brand-gold/20 bg-[#071B33]/50 rounded-sm">
              <p className="text-white/50 text-sm mb-4">Nenhum depoimento encontrado.</p>
              <button onClick={() => setIsEditing(true)} className="text-brand-gold hover:underline text-sm uppercase tracking-widest">Adicionar o primeiro depoimento</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
