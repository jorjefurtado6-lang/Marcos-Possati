import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Sobre Mim', href: '/#sobre-mim' },
  { name: 'Diferenciais', href: '/#diferenciais' },
  { name: 'Pacotes', href: '/#pacotes' },
  { name: 'Serviços', href: '/#servicos' },
  { name: 'Portfólio', href: '/#portfolio' },
  { name: 'Depoimentos', href: '/#depoimentos' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#071B33] border-b border-brand-gold/30 shadow-lg' : 'bg-transparent border-b border-brand-gold/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 border-2 border-brand-gold flex items-center justify-center font-bold text-lg text-brand-gold">
              MP
            </div>
            <span className="text-xl tracking-widest uppercase font-bold text-brand-gold hidden sm:block">
              Marcos Possati
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            <nav className="flex gap-6 text-[11px] uppercase tracking-[0.2em] font-sans text-white/80">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <a
              href="https://wa.me/5511978711905"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-brand-gold text-brand-navy font-sans font-bold uppercase text-[10px] tracking-widest hover:brightness-110 transition-all duration-300"
            >
              Solicitar Orçamento
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6 text-brand-gold" />
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-brand-navy z-50 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-brand-gold" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 mt-12">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-serif text-white hover:text-brand-gold transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://wa.me/5511978711905"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 px-8 py-3 bg-brand-gold text-brand-navy font-sans font-bold uppercase text-xs tracking-widest shadow-lg whitespace-nowrap"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
