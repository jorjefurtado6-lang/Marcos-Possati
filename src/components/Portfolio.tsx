import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const defaultPortfolioItems = [
  {
    id: '1',
    title: "Revisão de Tese de Doutorado",
    category: "Normas ABNT & Revisão",
    description: "Revisão minuciosa e adequação às normas ABNT de uma tese de 300 páginas na área de Direito Interacional. Foco em garantir a precisão semântica e clareza argumentativa sem alterar a voz do autor.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2712&auto=format&fit=crop"
  },
  {
    id: '2',
    title: "E-book: Liderança no Século XXI",
    category: "Redação & Edição",
    description: "Ghostwriting completo para um consultor de RH renomado. Produção de 80 páginas estruturadas, com linguagem persuasiva e foco em conversão e estabelecimento de autoridade.",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2692&auto=format&fit=crop"
  },
  {
    id: '3',
    title: "Revista Eletrônica Corporativa",
    category: "Edição de Textos",
    description: "Edição técnica dos artigos mensais de uma revista interna de tecnologia. Padronização de tom de voz para mais de 10 autores diferentes, garantindo leitura fluida.",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: '4',
    title: "Legendagem Curso de Investimentos",
    category: "Legendagem",
    description: "Transcrição e timing perfeito para legenda de um curso completo com 40 horas de duração. Rigor técnico em jargões financeiros.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: '5',
    title: "Blog: Escritório Jurídico",
    category: "Redação de Artigos",
    description: "Série de 20 artigos otimizados para SEO abordando mudanças recentes no Código Civil, traduzindo \"legatiês\" para linguagem acessível e profissional.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop"
  },
  {
    id: '6',
    title: "Revisão de Romance Histórico",
    category: "Revisão Literária",
    description: "Trabalho apaixonante na revisão ortográfica, gramatical e de estilo de uma obra de ficção de 450 páginas. Atenção especial à coesão narrativa e ritmo dos capítulos.",
    image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2692&auto=format&fit=crop"
  }
];

export default function Portfolio() {
  const [items, setItems] = useState<any[]>(defaultPortfolioItems);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'portfolio'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (data.length > 0) {
        setItems(data);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-[#051325] relative border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 border-b-2 border-brand-gold pb-4 inline-block">
            Meus <span className="text-brand-gold italic">Trabalhos</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden border border-brand-gold/30 aspect-[4/3] cursor-pointer bg-[#071B33]"
              onClick={() => navigate(`/trabalho/${item.id}`)}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter sepia-[0.3]"
              />
              <div className="absolute inset-0 bg-brand-navy/60 group-hover:bg-brand-navy/80 transition-colors duration-300 flex flex-col justify-end p-6">
                
                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2 block">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-brand-beige/80 text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {item.description}
                  </p>
                  <button className="flex items-center gap-2 text-white font-medium hover:text-brand-gold transition-colors text-sm border-b border-brand-gold pb-1 w-fit opacity-0 group-hover:opacity-100 duration-300 delay-200">
                    Visualizar Trabalho
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
