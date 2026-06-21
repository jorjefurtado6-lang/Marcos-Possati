import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const defaultTestimonials = [
  {
    id: '1',
    quote: "Trabalhar com o Marcos foi excelente. Ele elaborou conteúdos complexos com uma grande atenção aos detalhes. Os textos têm fluidez, clareza e são muito bem elaborados.",
    author: "Ana Paula R.",
    role: "Gestora de Conteúdo"
  },
  {
    id: '2',
    quote: "Excelente trabalho na revisão do meu livro. Muito profissional! Captou perfeitamente a voz da obra sem cometer interferências indevidas. Recomendo fortemente para autores.",
    author: "Marcos S. A.",
    role: "Escritor Independente"
  },
  {
    id: '3',
    quote: "Atendimento rápido, edição impecável e compromisso com o prazo. Melhorou significativamente a qualidade e a conversão dos meus textos institucionais. Recomendo!",
    author: "Carla D. M.",
    role: "Diretora de Marketing"
  }
];

export default function Testimonials() {
  const [items, setItems] = useState<any[]>(defaultTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (data.length > 0) {
        setItems(data);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (items.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section id="depoimentos" className="py-12 bg-brand-beige relative overflow-hidden">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 border border-brand-navy/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 border border-brand-navy/10 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-[#071B33]">
        
        <div className="flex justify-center mb-12">
          <Quote className="w-16 h-16 text-brand-navy/40" />
        </div>

        <div className="relative h-[250px] sm:h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center text-center"
            >
              <p className="text-xl md:text-3xl font-serif text-brand-navy leading-relaxed italic mb-8">
                "{items[currentIndex]?.quote}"
              </p>
              <div>
                <p className="text-[#071B33] font-bold text-[10px] uppercase tracking-widest">— {items[currentIndex]?.author}</p>
                <p className="text-brand-navy/50 text-xs font-sans mt-1">{items[currentIndex]?.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-brand-navy w-8' : 'bg-brand-navy/20 hover:bg-brand-navy/40'
              }`}
              aria-label={`Ir para depoimento ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
