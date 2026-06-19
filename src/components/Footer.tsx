import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-brand-navy text-white pt-16 pb-8 border-t border-brand-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <a href="#" className="font-serif text-3xl font-bold text-white tracking-wider flex items-center gap-2 mb-6">
              <span className="text-brand-gold">Marcos</span> Possati
            </a>
            <p className="text-white/60 font-sans text-sm leading-relaxed max-w-sm">
              Especialista em Redação, Revisão de Textos e Edição de Conteúdo. Lapidando palavras para comunicar com precisão e excelência.
            </p>
            <div className="mt-6">
              <Link to="/admin" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-brand-gold transition-colors">Acesso Restrito</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest mb-6 text-[10px]">Contato Direto</h4>
            <ul className="space-y-4 font-sans text-sm opacity-80">
              <li>
                <a href="https://wa.me/5511978711905" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-brand-gold transition-colors">
                  <MessageCircle className="w-4 h-4 text-brand-gold" />
                  <span>(11) 97871-1905</span>
                </a>
              </li>
              <li>
                <a href="mailto:marcopossati@hotmail.com" className="flex items-center gap-3 hover:text-brand-gold transition-colors">
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <span>marcopossati@hotmail.com</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-brand-gold font-bold uppercase tracking-widest mb-6 text-[10px]">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="https://br.linkedin.com/in/marcos-possati-80a79373" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-brand-gold transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-gold/20 pt-8 flex flex-col md:flex-row justify-center md:justify-start items-center text-white/50 text-[10px] font-sans uppercase tracking-widest">
          <p>© {currentYear} Marcos Possati. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
