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
import { Plus, Trash2, Edit2, X } from "lucide-react";

import { motion } from "motion/react";
export default function AdminPackages() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [type, setType] = useState("revision");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [words, setWords] = useState("");
  const [popular, setPopular] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "packages"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setType("revision");
    setName("");
    setDescription("");
    setWords("");
    setPopular(false);
    setCurrentId(null);
    setIsEditing(false);
  };

  const handleEdit = (item: any) => {
    setType(item.type || "revision");
    setName(item.name);
    setDescription(item.description);
    setWords(item.words);
    setPopular(item.popular || false);
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await deleteDoc(doc(db, "packages", id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { type, name, description, words, popular };
    if (currentId) {
      await updateDoc(doc(db, "packages", currentId), data);
    } else {
      await addDoc(collection(db, "packages"), data);
    }
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-serif text-brand-gold mb-2">
            Pacotes e Serviços
          </h2>
          <p className="text-white/60 text-sm font-sans">Gerencie os planos de revisão e redação.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-brand-gold text-brand-navy px-5 py-3 text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all rounded-sm"
          >
            <Plus size={16} /> Novo Pacote
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
              {currentId ? "Editar Pacote" : "Novo Pacote"}
            </h3>
            <button
              onClick={resetForm}
              className="text-white/40 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  Tipo de Serviço
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                >
                  <option value="revision">Revisão de Texto</option>
                  <option value="writing">Redação de Conteúdo</option>
                </select>
              </div>
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  Nome do Plano
                </label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                  placeholder="Ex: Editorial Pro"
                />
              </div>
            </div>
            <div>
              <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                Volume / Escopo
              </label>
              <input
                required
                value={words}
                onChange={(e) => setWords(e.target.value)}
                className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                placeholder="Ex: Até 5.000 palavras"
              />
            </div>
            <div>
              <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                Descrição dos Entregáveis
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner resize-none"
                placeholder="Detalhe o que está incluso no pacote..."
              ></textarea>
            </div>
            <div className="flex items-center gap-3 bg-[#051325] p-4 border border-brand-gold/10 rounded-sm">
              <input
                type="checkbox"
                id="popular"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="w-4 h-4 accent-brand-gold bg-[#071B33] border-brand-gold/30 rounded"
              />
              <label htmlFor="popular" className="text-white/80 text-sm cursor-pointer select-none">
                Destacar como pacote recomendado <span className="text-white/40 text-xs ml-1">(aparecerá em evidência no site)</span>
              </label>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-brand-gold text-brand-navy px-8 py-3 text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all rounded-sm"
              >
                {currentId ? "Salvar Alterações" : "Criar Pacote"}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {loading ? (
            <p className="text-white/50 text-sm flex items-center gap-2"><span className="animate-spin inline-block w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full"></span> Carregando pacotes...</p>
          ) : (
            items.map((item) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={item.id}
                className={`bg-[#071B33] border ${item.popular ? 'border-brand-gold' : 'border-brand-gold/20'} p-6 rounded-sm relative flex flex-col`}
              >
                {item.popular && (
                  <div className="absolute -top-3 left-6 bg-brand-gold text-brand-navy px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-sm shadow-md">
                    Destaque Recomendado
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4 mt-2">
                  <div>
                    <span className="text-brand-gold/60 text-[10px] uppercase tracking-widest mb-1 block">
                      {item.type === "revision" ? "Serviço de Revisão" : "Serviço de Redação"}
                    </span>
                    <h4 className="font-serif text-2xl text-white">
                      {item.name}
                    </h4>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-white/30 hover:text-brand-gold transition-colors p-2 bg-white/5 rounded-full"
                      title="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-white/30 hover:text-red-400 transition-colors p-2 bg-white/5 rounded-full"
                      title="Excluir"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-white/60 text-sm mb-6 flex-1 bg-[#051325]/50 p-4 rounded-sm border border-brand-gold/5">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm py-3 border-t border-brand-gold/10">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Volume Coberto:</span>
                  <span className="text-brand-gold font-medium">{item.words}</span>
                </div>
              </motion.div>
            ))
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed border-brand-gold/20 bg-[#071B33]/50 rounded-sm">
              <p className="text-white/50 text-sm mb-4">Nenhum pacote cadastrado.</p>
              <button onClick={() => setIsEditing(true)} className="text-brand-gold hover:underline text-sm uppercase tracking-widest">Criar meu primeiro pacote</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
