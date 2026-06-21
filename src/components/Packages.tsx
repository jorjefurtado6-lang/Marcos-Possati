import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const defaultRevisionPackages = [
  { name: 'Básico', description: 'Revisão ortográfica e gramatical rápida.', words: 'Até 5.000' },
  { name: 'Pro', description: 'Correção gramatical, de estilo e coesão.', words: 'Até 15.000', popular: true },
  { name: 'Avançado', description: 'Revisão profunda com reestruturação frasal.', words: 'Até 30.000' },
  { name: 'Premium', description: 'Revisão completa, ABNT e formatação.', words: 'Até 50.000' },
  { name: 'Sob Medida', description: 'Para livros, e-books e grandes projetos.', words: 'Personalizado' },
];

const defaultWritingPackages = [
  { name: 'Básico', description: 'Textos curtos para blog e redes sociais.', words: 'Até 1.000' },
  { name: 'Pro', description: 'Artigos otimizados para SEO (Iniciante).', words: 'Até 3.000' },
  { name: 'Avançado', description: 'Artigos de profundidade, e-books curtos.', words: 'Até 10.000', popular: true },
  { name: 'Premium', description: 'E-books completos, Guias definitivos.', words: 'Até 25.000' },
  { name: 'Sob Medida', description: 'Projetos contínuos e Ghostwriting.', words: 'Personalizado' },
];

export default function Packages() {
  const [revisionPackages, setRevisionPackages] = useState<any[]>(defaultRevisionPackages);
  const [writingPackages, setWritingPackages] = useState<any[]>(defaultWritingPackages);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'packages'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      if (data.length > 0) {
        setRevisionPackages(data.filter(p => p.type === 'revision'));
        setWritingPackages(data.filter(p => p.type === 'writing'));
      }
    });
    return () => unsub();
  }, []);
  return (
    <section id="pacotes" className="py-12 bg-[#051325] relative mt-[-20px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 border-b-2 border-brand-gold pb-4 inline-block">
            Planos e <span className="text-brand-gold italic">Pacotes</span>
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto font-sans mt-4">
            Soluções estruturadas para atender às necessidades específicas do seu projeto, com transparência e excelência comercial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Tabela de Revisão */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-brand-navy rounded-none shadow-2xl border border-brand-gold/30 overflow-hidden flex flex-col"
          >
            <div className="bg-brand-navy p-6 border-b border-brand-gold/30 text-center">
              <h3 className="text-xl font-serif font-bold text-brand-gold uppercase tracking-[0.2em]">
                Pacotes de Revisão
              </h3>
            </div>
            
            <div className="p-6 md:p-8 flex-grow bg-[#051325]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-gold/30 text-brand-gold font-sans uppercase text-[10px] tracking-widest">
                    <th className="pb-4 pt-2 font-bold w-1/3">Plano</th>
                    <th className="pb-4 pt-2 font-bold hidden sm:table-cell">Descrição</th>
                    <th className="pb-4 pt-2 font-bold w-1/4">Volume</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10 font-sans text-sm">
                  {revisionPackages.map((pkg, i) => (
                    <tr key={i} className="hover:bg-brand-navy transition-colors">
                      <td className="py-5 pr-4 align-top">
                        <span className="font-bold text-white block">{pkg.name}</span>
                        {pkg.popular && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-brand-gold text-brand-navy px-2 py-0.5 rounded-sm uppercase tracking-widest mt-2">
                            Mais Buscado
                          </span>
                        )}
                        <span className="block sm:hidden mt-2 text-xs text-white/70 leading-snug">
                          {pkg.description}
                        </span>
                      </td>
                      <td className="py-5 pr-4 text-white/70 hidden sm:table-cell align-top text-xs">
                        {pkg.description}
                      </td>
                      <td className="py-5 font-medium text-white/90 align-top text-xs">
                        {pkg.words}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-brand-navy border-t border-brand-gold/30">
               <a
                  href="https://wa.me/5511978711905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 border border-brand-gold text-brand-gold font-sans font-bold hover:bg-brand-gold hover:text-brand-navy transition-all duration-300 tracking-widest uppercase text-[10px]"
                >
                  Solicitar Orçamento
                </a>
            </div>
          </motion.div>

          {/* Tabela de Redação */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-brand-navy rounded-none shadow-2xl border border-brand-gold/30 overflow-hidden flex flex-col relative"
          >
            <div className="bg-brand-navy p-6 border-b border-brand-gold/30 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-brand-gold pointer-events-none mix-blend-overlay"></div>
              <h3 className="text-xl font-serif font-bold text-brand-gold uppercase tracking-[0.2em] relative z-10">
                Pacotes de Redação
              </h3>
            </div>
            
            <div className="p-6 md:p-8 flex-grow bg-[#051325]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-brand-gold/30 text-brand-gold font-sans uppercase text-[10px] tracking-widest">
                    <th className="pb-4 pt-2 font-bold w-1/3">Plano</th>
                    <th className="pb-4 pt-2 font-bold hidden sm:table-cell">Descrição</th>
                    <th className="pb-4 pt-2 font-bold w-1/4">Escopo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-gold/10 font-sans text-sm">
                  {writingPackages.map((pkg, i) => (
                    <tr key={i} className="hover:bg-brand-navy transition-colors">
                      <td className="py-5 pr-4 align-top">
                        <span className="font-bold text-white block">{pkg.name}</span>
                        {pkg.popular && (
                          <span className="inline-block mt-1 text-[10px] font-bold bg-brand-gold text-brand-navy px-2 py-0.5 rounded-sm uppercase tracking-widest mt-2">
                            Recomendado
                          </span>
                        )}
                        <span className="block sm:hidden mt-2 text-xs text-white/70 leading-snug">
                          {pkg.description}
                        </span>
                      </td>
                      <td className="py-5 pr-4 text-white/70 hidden sm:table-cell align-top text-xs">
                        {pkg.description}
                      </td>
                      <td className="py-5 font-medium text-white/90 align-top text-xs">
                        {pkg.words}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-brand-navy border-t border-brand-gold/30">
               <a
                  href="https://wa.me/5511978711905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-4 bg-brand-gold text-brand-navy font-sans font-bold hover:brightness-110 shadow-lg transition-all duration-300 tracking-widest uppercase text-[10px]"
                >
                  Solicitar Orçamento
                </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
