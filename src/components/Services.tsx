import { motion } from 'motion/react';
import { PenTool, CheckSquare, AlignLeft, BookOpen, FileText, Subtitles } from 'lucide-react';

const services = [
  {
    icon: <PenTool className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />,
    title: "Redação Corporativa",
    description: "Criação de artigos, e-books e copys persuasivas alinhadas à voz da sua marca."
  },
  {
    icon: <CheckSquare className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />,
    title: "Revisão Textual",
    description: "Correção ortográfica, gramatical e sintática, garantindo fluidez e coesão."
  },
  {
    icon: <AlignLeft className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />,
    title: "Padronização",
    description: "Ajuste de textos para uma linguagem uniforme, respeitando guias de estilo."
  },
  {
    icon: <BookOpen className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />,
    title: "Normas ABNT",
    description: "Formatação rigorosa de TCCs, monografias, dissertações e artigos acadêmicos."
  },
  {
    icon: <FileText className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />,
    title: "Edição de Textos",
    description: "Reestruturação profunda para melhorar a clareza, impacto e ritmo da leitura."
  },
  {
    icon: <Subtitles className="w-8 h-8 text-brand-navy" strokeWidth={1.5} />,
    title: "Legendagem",
    description: "Transcrição e criação de legendas precisas e sincronizadas para vídeos."
  }
];

export default function Services() {
  return (
    <section id="servicos" className="py-12 bg-[#051325] relative mt-[-20px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 border-b-2 border-brand-gold pb-4 inline-block"
          >
            Áreas de <span className="text-brand-gold italic">Atuação</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-navy p-6 border border-brand-gold/30 hover:border-brand-gold transition-all duration-300 group cursor-default relative overflow-hidden"
            >
              <h3 className="text-xs uppercase tracking-widest text-brand-gold border-l-2 border-brand-gold pl-2 mb-4">
                {item.title}
              </h3>
              
              <p className="text-white/70 font-sans text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
