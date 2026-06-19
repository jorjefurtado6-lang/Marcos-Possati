import { motion } from 'motion/react';

export default function FinalCta() {
  return (
    <section className="py-24 bg-[#051325] relative overflow-hidden border-y border-brand-gold/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-navy p-12 md:p-16 border border-brand-gold/30 relative"
        >
          {/* Decorative Corner borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-gold m-6 opacity-50"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold m-6 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-gold m-6 opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-gold m-6 opacity-50"></div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6 leading-tight">
            Pronto para <span className="text-brand-gold italic">elevar a qualidade</span> dos seus textos?
          </h2>
          
          <p className="text-lg text-white/70 mb-10 max-w-2xl mx-auto font-sans">
            Solicite um orçamento personalizado e receba atendimento profissional focado em extrair o máximo de potencial do seu conteúdo.
          </p>
          
          <a
            href="#contato"
            className="inline-block px-10 py-5 bg-brand-gold text-brand-navy font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all duration-300 shadow-xl"
          >
            Solicitar Orçamento
          </a>
        </motion.div>
      </div>
    </section>
  );
}
