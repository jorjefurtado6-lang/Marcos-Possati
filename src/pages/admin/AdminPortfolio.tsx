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
import { Plus, Trash2, Edit2, X, FileText, Upload } from "lucide-react";

import { motion } from "motion/react";
export default function AdminPortfolio() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [documentFile, setDocumentFile] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileError("");

    // Limit base64 document sizes to ~800KB for Firestore documents safety (1MB limit)
    if (file.size > 800 * 1024) {
      setFileError("Arquivo muito grande. O limite máximo é de 800KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDocumentFile(reader.result);
        setDocumentName(file.name);
      }
    };
    reader.onerror = () => {
      setFileError("Erro ao ler o arquivo.");
    };
    reader.readAsDataURL(file);
  };

  const removeFile = () => {
    setDocumentFile("");
    setDocumentName("");
    setFileError("");
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "portfolio"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const resetForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setImage("");
    setDocumentFile("");
    setDocumentName("");
    setFileError("");
    setCurrentId(null);
    setIsEditing(false);
  };

  const handleEdit = (item: any) => {
    setTitle(item.title);
    setCategory(item.category);
    setDescription(item.description);
    setImage(item.image);
    setDocumentFile(item.documentFile || "");
    setDocumentName(item.documentName || "");
    setFileError("");
    setCurrentId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await deleteDoc(doc(db, "portfolio", id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { 
      title, 
      category, 
      description, 
      image,
      documentFile,
      documentName
    };
    if (currentId) {
      await updateDoc(doc(db, "portfolio", currentId), data);
    } else {
      await addDoc(collection(db, "portfolio"), data);
    }
    resetForm();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-serif text-brand-gold mb-2">
            Portfólio
          </h2>
          <p className="text-white/60 text-sm font-sans">Gerencie os projetos exibidos no seu site.</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-brand-gold text-brand-navy px-5 py-3 text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all rounded-sm"
          >
            <Plus size={16} /> Adicionar Projeto
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
              {currentId ? "Editar Projeto" : "Novo Projeto"}
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
                  Título do Projeto
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                  placeholder="Ex: Revisão de Tese"
                />
              </div>
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  Categoria
                </label>
                <input
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                  placeholder="Ex: Normas ABNT"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  URL da Imagem de Capa
                </label>
                <input
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div>
                <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                  Documento de Apoio (Word ou PDF) - Opcional
                </label>
                <div className="w-full bg-[#051325] border border-brand-gold/20 p-3 rounded-sm shadow-inner flex items-center justify-between gap-4">
                  {documentName ? (
                    <div className="flex items-center gap-2 overflow-hidden flex-1">
                      <FileText className="text-brand-gold w-4 h-4 shrink-0" />
                      <span className="text-white text-xs truncate" title={documentName}>
                        {documentName}
                      </span>
                    </div>
                  ) : (
                    <span className="text-white/40 text-xs">
                      Nenhum arquivo selecionado (.pdf, .doc, .docx)
                    </span>
                  )}
                  
                  <div className="flex items-center gap-2">
                    {documentName ? (
                      <button
                        type="button"
                        onClick={removeFile}
                        className="text-red-400 hover:text-red-300 text-[10px] uppercase tracking-widest font-bold"
                      >
                        Remover
                      </button>
                    ) : (
                      <label className="cursor-pointer text-brand-gold hover:text-white text-[10px] uppercase tracking-widest font-bold flex items-center gap-1">
                        <Upload size={12} /> Selecionar
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>
                {fileError && (
                  <p className="text-red-400 text-xs mt-1">{fileError}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                Descrição do Projeto
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded-sm shadow-inner resize-none"
                placeholder="Descreva os detalhes do trabalho realizado..."
              ></textarea>
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-brand-gold text-brand-navy px-8 py-3 text-xs uppercase font-bold tracking-widest hover:brightness-110 transition-all rounded-sm"
              >
                {currentId ? "Salvar Alterações" : "Publicar Projeto"}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-white/50 text-sm flex items-center gap-2"><span className="animate-spin inline-block w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full"></span> Carregando portfólio...</p>
          ) : (
            items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#071B33] border border-brand-gold/20 flex flex-col rounded-sm overflow-hidden group hover:border-brand-gold/40 transition-colors"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B33] to-transparent opacity-60"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-brand-gold text-[9px] uppercase tracking-widest inline-block mb-2 font-bold">
                    {item.category}
                  </span>
                  <h4 className="font-serif font-bold text-xl text-white mb-3">
                    {item.title}
                  </h4>
                  <p className="text-white/50 text-sm line-clamp-3 mb-4 flex-1">
                    {item.description}
                  </p>
                  {item.documentName && (
                    <div className="flex items-center gap-1.5 text-brand-gold text-xs mb-4 select-none bg-[#051325]/50 px-2 py-1 rounded w-fit max-w-full">
                      <FileText size={12} className="shrink-0" />
                      <span className="truncate" title={item.documentName}>{item.documentName}</span>
                    </div>
                  )}
                  <div className="flex gap-4 pt-4 border-t border-brand-gold/10">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-white/40 hover:text-brand-gold flex items-center gap-2 text-xs uppercase tracking-widest flex-1 justify-center transition-colors"
                    >
                      <Edit2 size={14} /> Editar
                    </button>
                    <div className="w-px bg-brand-gold/10"></div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-white/40 hover:text-red-400 flex items-center gap-2 text-xs uppercase tracking-widest flex-1 justify-center transition-colors"
                    >
                      <Trash2 size={14} /> Excluir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
          {!loading && items.length === 0 && (
            <div className="col-span-full py-12 text-center border border-dashed border-brand-gold/20 bg-[#071B33]/50 rounded-sm">
              <p className="text-white/50 text-sm mb-4">Seu portfólio está vazio.</p>
              <button onClick={() => setIsEditing(true)} className="text-brand-gold hover:underline text-sm uppercase tracking-widest">Adicionar primeiro projeto</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
