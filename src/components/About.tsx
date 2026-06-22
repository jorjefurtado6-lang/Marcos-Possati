import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="sobre-mim" className="py-12 bg-[#051325] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col w-full">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white border-b-2 border-brand-gold pb-4 inline-block">
                Sobre <span className="text-brand-gold italic">Mim</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-white/70 font-sans leading-relaxed w-full">
              <p className="text-xl text-white font-medium italic opacity-90 font-serif">
                Revisor de textos, formado em Letras (Português/Inglês), focado em clareza, fluidez e correção gramatical.
              </p>
              
              <p>
                Tenho <strong className="text-brand-gold">mais de 7 anos de experiência</strong> em análise e aprimoramento textual, atribuindo um olhar técnico a problemas que comprometem a compreensão e a qualidade da escrita.
              </p>
              
              <p>
                Meu trabalho vai além de corrigir erros: identifico falhas que afetam a interpretação, a credibilidade e o impacto do conteúdo, como redundâncias, construções confusas e inadequações ao público.
              </p>

              <p>
                Trabalho, principalmente, com materiais digitais, informativos e sites, nos quais a qualidade da escrita influencia, diretamente, a experiência do leitor e os resultados. Em resumo, minha abordagem consiste em:
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Eliminar erros gramaticais e ortográficos',
                  'Melhorar a fluidez e a organização das ideias',
                  'Reduzir excessos e repetições',
                  'Adequar o texto ao público e ao contexto'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-brand-gold mr-3 transform translate-y-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="pt-4 border-t border-brand-gold/10 italic">
                Cada intervenção é feita com critério, preservando o sentido original, tornando a comunicação mais clara e eficiente.
              </p>
            </div>
            

            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
