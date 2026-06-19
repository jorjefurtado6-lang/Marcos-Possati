import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Footer from '../components/Footer';

// Use same default items for fallback
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
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2712&auto=format&fit=crop"
  }
];

export default function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      window.scrollTo(0, 0);
      try {
        if (!id) return;
        const docRef = doc(db, 'portfolio', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProject({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to default items if not found in db
          const defaultItem = defaultPortfolioItems.find(item => item.id === id);
          if (defaultItem) {
            setProject(defaultItem);
          } else {
            navigate('/');
          }
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        const defaultItem = defaultPortfolioItems.find(item => item.id === id);
        if (defaultItem) setProject(defaultItem);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#051325] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="min-h-screen bg-[#051325] pt-20">
      {/* Navigation Bar Top */}
      <nav className="fixed top-0 w-full z-50 bg-[#071B33] border-b border-brand-gold/30 shadow-lg h-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center font-bold text-lg text-brand-gold">
              MP
            </div>
            <span className="text-xl tracking-widest uppercase font-bold text-brand-gold hidden sm:block">
              Marcos Possati
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="text-white/70 hover:text-brand-gold transition-colors text-[11px] uppercase tracking-[0.2em] font-sans flex items-center gap-2">
              <ArrowLeft size={16} /> Voltar ao Início
            </Link>
            <a
              href="https://wa.me/5511978711905"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-brand-gold text-brand-navy font-sans font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all duration-300 hidden sm:block"
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-[#071B33] border border-brand-gold/20 shadow-2xl rounded-sm overflow-hidden"
        >
          <div className="aspect-video relative">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B33] via-[#071B33]/80 to-transparent flex items-end p-8 md:p-12">
               <div>
                 <span className="bg-brand-gold text-brand-navy text-xs font-bold px-3 py-1 uppercase tracking-widest mb-4 inline-block">
                    {project.category}
                 </span>
                 <h1 className="text-3xl md:text-5xl font-serif font-bold text-white border-l-4 border-brand-gold pl-4">
                    {project.title}
                 </h1>
               </div>
            </div>
          </div>

          <div className="p-8 md:p-12 text-white">
            <h2 className="text-sm uppercase font-bold tracking-widest text-brand-gold mb-6 border-b border-brand-gold/20 pb-2">Detalhes do Projeto</h2>
            <div className="prose prose-invert prose-brand-gold max-w-none">
              <p className="text-white/80 font-sans leading-relaxed text-lg whitespace-pre-wrap">
                {project.description}
              </p>
            </div>
            
            <div className="mt-12 flex justify-end items-center gap-4 pt-8 border-t border-brand-gold/10">
               <Link to="/" className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-widest">
                 Ver Outros Trabalhos
               </Link>
               <a href="https://wa.me/5511978711905" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-brand-gold text-brand-navy font-sans font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-colors shadow-lg">
                 Solicitar Serviço Semelhante
               </a>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
