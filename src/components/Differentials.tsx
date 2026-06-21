import { motion } from 'motion/react';
import { Clock, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

const differentials = [
  {
    icon: <Clock className="w-10 h-10 text-brand-gold" strokeWidth={1.5} />,
    title: "7 Anos de Experiência",
    description: "Bagagem sólida atuando com diversos formatos e nichos, garantindo maturidade literária e técnica ao seu projeto."
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-brand-gold" strokeWidth={1.5} />,
    title: "Padrões Elevados e Rigorosos",
    description: "Cada palavra é tratada com extrema importância. Não aceito nada menos que a perfeição estrutural e gramatical."
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-brand-gold" strokeWidth={1.5} />,
    title: "Atendimento Personalizado",
    description: "Comunicação direta, transparente e adaptada ao seu estilo. Seu projeto é tratado como único e valioso."
  },
  {
    icon: <Eye className="w-10 h-10 text-brand-gold" strokeWidth={1.5} />,
    title: "Identificação Precisa de Falhas",
    description: "Olhar clínico para inconsistências argumentativas, repetições, vícios de linguagem e desvios nas normas."
  }
];

export default function Differentials() {
  return (
    <section id="diferenciais" className="py-12 bg-[#051325] relative overflow-hidden mt-[-20px]">
      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#D4A64A 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 border-b-2 border-brand-gold pb-4 inline-block mt-[-50px]"
          >
            Valores e <span className="text-brand-gold italic">Diferenciais</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-gold/20 p-px">
          {differentials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-brand-navy p-8 transition-colors duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="text-brand-gold">
                  {/* Simplificado visualmente para remeter à inspiração */}
                  <span className="text-2xl">&#10022;</span>
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-brand-gold mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-sans text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
