import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="sobre-mim" className="py-12 bg-[#051325] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white border-b-2 border-brand-gold pb-4 inline-block">
                Sobre <span className="text-brand-gold italic">Mim</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-white/70 font-sans leading-relaxed">
              <p className="text-xl text-white font-medium italic opacity-90 font-serif">
                Profissional especializado em revisão textual, redação acadêmica e edição de conteúdo.
              </p>
              
              <p>
                Com <strong className="text-brand-gold">mais de 7 anos de experiência</strong> atuando no mercado de produção de conteúdo, desenvolvi um olhar clínico para as minúcias que diferenciam um bom texto de um texto extraordinário.
              </p>
              
              <p>
                Meu trabalho é pautado no compromisso inabalável com a <strong>qualidade, clareza e precisão</strong>. Entendo que cada palavra carrega um peso e um propósito, e meu objetivo é garantir que sua mensagem chegue ao leitor da forma mais impactante e correta possível.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Atendimento personalizado e focado nas necessidades de cada cliente.',
                  'Destaque para credibilidade em cada parágrafo.',
                  'Responsabilidade com prazos e sigilo profissional.',
                  'Busca incessante pela excelência estética e estrutural.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-gold mr-3 transform translate-y-1">❖</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
