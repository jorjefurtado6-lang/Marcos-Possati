import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Package,
  MessageSquare,
  LogOut,
  Menu,
  X,
  UserCheck,
  KeyRound,
} from "lucide-react";

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("Conta administrativa criada com sucesso!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      console.error(err);
      const code = err?.code || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        setError("E-mail ou senha incorretos. Se for seu primeiro acesso, use a opção 'Criar conta de admin'.");
      } else if (code === "auth/email-already-in-use") {
        setError("Este e-mail já possui cadastro. Alterne para 'Entrar' para fazer login.");
      } else if (code === "auth/weak-password") {
        setError("A senha deve ter no mínimo 6 caracteres.");
      } else if (code === "auth/invalid-email") {
        setError("Insira um endereço de e-mail válido.");
      } else {
        setError(err?.message || "Ocorreu um erro ao processar. Verifique os dados digitados.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Preencha o campo de e-mail para receber as instruções de recuperação de senha.");
      return;
    }
    setError("");
    setSuccess("");
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess("E-mail de redefinição enviado! Verifique sua caixa de entrada.");
    } catch (err: any) {
      console.error(err);
      setError("Não foi possível enviar o e-mail de redefinição. Verifique o endereço digitado.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#071B33] flex items-center justify-center text-brand-gold">
        Carregando...
      </div>
    );

  if (!user) {
    return (
      <div className="min-h-screen bg-[#051325] flex items-center justify-center font-sans px-4">
        <div className="bg-[#071B33] p-8 pb-10 w-full max-w-md border border-brand-gold/30 shadow-2xl">
          <h2 className="text-2xl font-serif text-brand-gold mb-2 text-center">
            Acesso Restrito
          </h2>
          <p className="text-white/50 text-xs text-center mb-6 border-b border-brand-gold/20 pb-4">
            Painel Administrativo Marcos Possati
          </p>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-[#051325] border border-brand-gold/20 rounded">
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(false);
                setError("");
                setSuccess("");
              }}
              className={`py-2 text-[11px] uppercase tracking-wider font-semibold transition-all rounded ${
                !isRegisterMode
                  ? "bg-brand-gold text-brand-navy shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegisterMode(true);
                setError("");
                setSuccess("");
              }}
              className={`py-2 text-[11px] uppercase tracking-wider font-semibold transition-all rounded ${
                isRegisterMode
                  ? "bg-brand-gold text-brand-navy shadow"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Criar Conta Admin
            </button>
          </div>

          {error && (
            <p className="text-red-400 text-xs mb-4 text-center bg-red-950/30 p-2 border border-red-500/20 rounded">
              {error}
            </p>
          )}

          {success && (
            <p className="text-emerald-400 text-xs mb-4 text-center bg-emerald-950/30 p-2 border border-emerald-500/20 rounded">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/50 text-[10px] uppercase tracking-widest mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded shadow-inner"
                required
                placeholder="seuemail@exemplo.com"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-white/50 text-[10px] uppercase tracking-widest">
                  Senha {isRegisterMode && "(mínimo 6 dígitos)"}
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={handleResetPassword}
                    className="text-[10px] text-brand-gold/80 hover:text-brand-gold underline"
                  >
                    Esqueci a senha
                  </button>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#051325] border border-brand-gold/20 p-3 text-white text-sm outline-none focus:border-brand-gold transition-colors rounded shadow-inner"
                required
                placeholder="••••••••"
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-gold text-brand-navy font-bold text-[10px] uppercase tracking-widest py-3 mt-6 hover:brightness-110 transition-all flex items-center justify-center gap-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? (
                "Processando..."
              ) : isRegisterMode ? (
                <>
                  <UserCheck size={16} /> Cadastrar Administrador
                </>
              ) : (
                <>
                  <KeyRound size={16} /> Entrar no Painel
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-brand-gold/10 pt-4">
            <Link
              to="/"
              className="text-xs text-white/40 hover:text-brand-gold transition-colors"
            >
              ← Voltar ao site principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Portfólio", path: "/admin/portfolio", icon: ImageIcon },
    { name: "Pacotes", path: "/admin/packages", icon: Package },
    { name: "Depoimentos", path: "/admin/testimonials", icon: MessageSquare },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-brand-gold/20 flex justify-between items-center">
        <div>
          <h1 className="font-serif text-brand-gold text-xl font-bold tracking-widest uppercase">
            Admin Panel
          </h1>
          <p className="text-white/50 text-xs mt-1">Marcos Possati</p>
        </div>
        <button 
          className="md:hidden text-white/50 hover:text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "bg-brand-gold/10 text-brand-gold border-l-2 border-brand-gold"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-brand-gold/20">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-sm text-white/50 hover:text-red-400 transition-colors w-full"
        >
          <LogOut size={18} />
          Sair
        </button>
        <Link
          to="/"
          className="text-[10px] text-white/30 uppercase tracking-widest text-center block mt-4 hover:text-white/50"
        >
          Voltar ao site
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#051325] flex flex-col md:flex-row font-sans text-white">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#071B33] border-b border-brand-gold/20 p-4 flex justify-between items-center">
        <h1 className="font-serif text-brand-gold tracking-widest uppercase font-bold">Admin</h1>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-brand-gold"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-[#071B33] border-r border-brand-gold/20 flex-col fixed h-full z-20">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="w-[80%] max-w-sm bg-[#071B33] border-r border-brand-gold/20 flex flex-col relative z-50 h-full transform transition-transform">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:ml-64 overflow-hidden bg-[#051325] min-h-screen">
        <main className="flex-1 p-6 lg:p-12 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
