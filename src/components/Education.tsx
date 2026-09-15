import { motion } from 'motion/react';
import { GraduationCap, Award, Sparkles, BookOpen, TrendingUp } from 'lucide-react';

const courses = [
  {
    title: 'Letras — Português/Inglês',
    category: 'Graduação',
    icon: <GraduationCap className="w-6 h-6 text-brand-gold" strokeWidth={1.75} />,
  },
  {
    title: 'Pós-graduação em Revisão de Textos',
    category: 'Especialização',
    icon: <Award className="w-6 h-6 text-brand-gold" strokeWidth={1.75} />,
  },
  {
    title: 'Inteligência Artificial na Análise de Textos',
    category: 'Tecnologia & Inovação',
    icon: <Sparkles className="w-6 h-6 text-brand-gold" strokeWidth={1.75} />,
  },
  {
    title: 'Formação de editores de didáticos e sistemas de ensino',
    category: 'Mercado Editorial',
    icon: <BookOpen className="w-6 h-6 text-brand-gold" strokeWidth={1.75} />,
  },
  {
    title: 'Formação em Marketing de Conteúdo e Inbound Online',
    category: 'Comunicação Digital',
    icon: <TrendingUp className="w-6 h-6 text-brand-gold" strokeWidth={1.75} />,
  },
];

export default function Education() {
  return (
    <section id="formacao" className="py-14 bg-[#071B33] relative border-t border-brand-gold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white border-b-2 border-brand-gold pb-4 inline-block">
              Formação e <span className="text-brand-gold italic">cursos</span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`p-6 bg-[#051325] border border-brand-gold/25 hover:border-brand-gold/60 transition-all duration-300 rounded-sm shadow-lg flex items-start gap-4 ${
                index === courses.length - 1 ? 'md:col-span-2 md:max-w-xl md:mx-auto md:w-full' : ''
              }`}
            >
              <div className="p-3 bg-brand-gold/10 rounded-sm shrink-0 border border-brand-gold/20">
                {course.icon}
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-wider text-brand-gold font-sans font-semibold">
                  {course.category}
                </span>
                <h3 className="text-lg md:text-xl font-serif font-medium text-white mt-1 leading-snug">
                  {course.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
