import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect (simulated via fixed attachment if needed, or structured) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2670&auto=format&fit=crop")',
        }}
      >
        <div className="absolute inset-0 bg-brand-navy/85 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-navy/90"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 md:mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block mb-4 relative"
        >
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-brand-gold opacity-50 -translate-x-2 -translate-y-2"></div>
          <span className="text-brand-gold font-sans font-bold tracking-[0.4em] text-[12px] uppercase pt-0 mt-0">
            Portfólio Profissional
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 border-b-2 border-brand-gold pb-4 inline-block drop-shadow-xl"
        >
          Marcos Possati
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-4 text-xl md:text-2xl text-white opacity-80 max-w-3xl mx-auto font-serif italic mb-8"
        >
          Excelência em Revisão de Textos, Redação e Edição de Conteúdo Profissional
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-8 flex flex-col sm:flex-row gap-6 justify-center"
        >
          <a
            href="https://wa.me/5511978711905"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-brand-gold text-brand-navy font-sans font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all duration-300"
          >
            Solicitar Orçamento
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 border border-brand-gold text-brand-gold font-sans font-bold text-[10px] uppercase tracking-widest hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 backdrop-blur-sm"
          >
            Ver Meus Trabalhos
          </a>
        </motion.div>

        {/* Scroll indicator - Moved below buttons into normal flow */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 hidden md:flex justify-center"
        >
          <a href="#sobre-mim" className="cursor-pointer">
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-[49px] border-2 border-brand-gold/50 hover:border-brand-gold transition-colors rounded-full flex justify-center pt-1"
            >
              <div className="w-1 h-2 bg-brand-gold rounded-full"></div>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
