'use client';

import { motion } from 'framer-motion';
import { Quote, Star, BadgeCheck } from 'lucide-react';

const testimonials = [
  {
    id: 'dumas',
    author: 'Alexandre Dumas',
    role: 'Author, The Count of Monte Cristo',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Alexander_Dumas_p%C3%A8re_par_Nadar_-_Google_Art_Project.jpg/500px-Alexander_Dumas_p%C3%A8re_par_Nadar_-_Google_Art_Project.jpg',
    content: "If I had known Robin Wood's API back in 1844, Edmond Dantès would have escaped the Château d'If in time for the wedding reception. 14 years of imprisonment compressed into 14 milliseconds.",
    rating: 5
  },
  {
    id: 'hugo',
    author: 'Victor Hugo',
    role: 'Enterprise User, Les Misérables',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Victor_Hugo_by_%C3%89tienne_Carjat_1876_-_full.jpg',
    content: "They deleted my 50-page description of the Paris sewer system, but the load time is incredible. Finally, a story that moves as fast as the revolution. My bloat is gone.",
    rating: 5
  },
  {
    id: 'dostoevsky',
    author: 'Fyodor Dostoevsky',
    role: 'Beta Tester, Crime and Punishment',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Vasily_Perov_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%A4.%D0%9C.%D0%94%D0%BE%D1%81%D1%82%D0%BE%D0%B5%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE_-_Google_Art_Project.jpg',
    content: "If Raskolnikov ran on Robin Wood, he would have skipped the 300 pages of guilt and gone straight to the confession. Internal monologues optimized by 90%.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header da Seção */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Star size={12} fill="currentColor" />
            Timeless Efficiency
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4"
          >
            Approved by the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Masters of Content</span>.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Even the most prolific writers in history agree: sometimes, you just need to get to the point.
          </motion.p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full relative group"
            >
              {/* Ícone de Aspas Fundo */}
              <Quote className="absolute top-6 right-6 text-slate-100 w-12 h-12 rotate-180 transition-colors group-hover:text-emerald-50" />

              {/* Conteúdo */}
              <div className="flex-1 mb-8 relative z-10">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg font-medium leading-relaxed font-serif italic">
                  "{t.content}"
                </p>
              </div>

              {/* Autor */}
              <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6">
                <div className="relative">
                  <img 
                    src={t.avatar} 
                    alt={t.author} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                     <BadgeCheck size={14} className="text-blue-500 fill-current" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.author}</h4>
                  <p className="text-slate-500 text-xs font-mono">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}