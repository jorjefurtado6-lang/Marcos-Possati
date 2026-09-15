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
            
            <div className="space-y-6 text-lg text-white/85 font-sans leading-relaxed w-full">
              <p className="whitespace-pre-wrap">
                {"  "}Sou redator, revisor e editor de textos, formado em Letras (Português/Inglês), com pós-graduação em Revisão de Textos.
              </p>
              
              <p className="whitespace-pre-wrap">
                {"  "}Tenho mais de 7 anos de experiência em análise, produção, revisão e aprimoramento textual, com foco em clareza, fluidez, correção gramatical e adequação do conteúdo ao público e ao objetivo de cada projeto.
              </p>
              
              <p className="whitespace-pre-wrap">
                {"  "}Meu trabalho vai além da correção de erros: identifico problemas que comprometem a compreensão, a organização e a qualidade do texto, como redundâncias, construções confusas, falhas de coesão e inadequações de linguagem.
              </p>

              <p className="whitespace-pre-wrap">
                {"  "}Também possuo formação complementar em Inteligência Artificial aplicada à escrita, Material Didático, Marketing Digital e SEO, ampliando minha atuação em diferentes tipos de conteúdo e projetos digitais.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
