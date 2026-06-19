import { motion } from 'motion/react';

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href="https://wa.me/5511978711905"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-[#20bd5a] hover:scale-110 transition-all duration-300 group"
      aria-label="Contato via WhatsApp"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-30"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8 relative z-10"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M11.996 2h-.002c-5.503 0-9.994 4.492-9.994 9.995 0 1.942.545 3.757 1.488 5.305l-1.5 5.485 5.61-1.472c1.493.856 3.226 1.353 5.064 1.353 5.502 0 9.993-4.492 9.993-9.995s-4.49-9.995-9.993-9.995zm.002 18.064c-1.572 0-3.048-.415-4.33-1.144l-.307-.174-3.042.8.815-2.966-.192-.306c-.785-1.258-1.233-2.753-1.233-4.34C4.12 7.07 8.044 3.14 12 3.14c3.955 0 7.878 3.93 7.878 7.854 0 3.923-3.925 7.854-7.88 7.854zm4.238-6.108c-.232-.116-1.373-.677-1.584-.754-.212-.077-.367-.116-.522.116-.154.232-.598.754-.733.91-.135.154-.27.174-.502.058-.232-.116-.98-.362-1.867-1.15-.69-.614-1.155-1.374-1.29-1.606-.135-.232-.014-.356.102-.472.105-.105.232-.27.348-.405.116-.135.154-.232.232-.386.077-.154.038-.29-.02-.406-.058-.116-.522-1.26-.714-1.724-.188-.456-.38-.395-.522-.403-.135-.008-.29-.01-.444-.01-.154 0-.405.058-.616.29-.212.232-.81 .792-.81 1.93 0 1.138.83 2.238.946 2.392.116.154 1.638 2.502 3.966 3.504.553.238 1.05 .412 1.455.53.565.18 1.08.155 1.488.094.46-.068 1.373-.56 1.566-1.102.193-.54.193-1.002.135-1.102-.058-.1-.212-.154-.444-.27z" />
      </svg>
    </motion.a>
  );
}
