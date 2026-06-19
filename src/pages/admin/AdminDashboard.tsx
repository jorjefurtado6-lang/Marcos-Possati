import { LayoutDashboard, Users, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminDashboard() {
  const stats = [
    { label: "Visitas no Mês", value: "1,204", icon: Users },
    { label: "Projetos no Portfólio", value: "12", icon: FileText },
    { label: "Pacotes Ativos", value: "8", icon: CheckCircle },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-10">
        <h2 className="text-3xl font-serif text-brand-gold mb-3">
          Resumo do Sistma
        </h2>
        <p className="text-white/60 font-sans text-sm max-w-2xl">
          Bem-vindo ao painel de gerenciamento. Aqui você tem uma visão geral do seu conteúdo e atalhos rápidos para as seções mais importantes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#071B33] border border-brand-gold/20 p-6 flex items-start gap-4"
            >
              <div className="bg-brand-gold/10 p-3 rounded-sm text-brand-gold">
                <Icon size={24} />
              </div>
              <div>
                <p className="text-white/50 text-[10px] uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-serif text-white">{stat.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-[#071B33] border border-brand-gold/20 p-8 text-center max-w-2xl mx-auto rounded-sm">
        <LayoutDashboard className="w-12 h-12 text-brand-gold/30 mx-auto mb-4" />
        <h3 className="text-xl font-serif text-white mb-2">Selecione uma área no menu</h3>
        <p className="text-white/60 text-sm font-sans mb-6">
          Utilize a barra de navegação lateral para adicionar novos trabalhos ao seu portfólio, editar seus pacotes de serviços ou atualizar os depoimentos de clientes.
        </p>
      </div>
    </div>
  );
}

