"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

const Editais = () => {
  const categories = [
    {
      title: "Fomento Municipal",
      description: "Editais de Extremoz-RN",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop",
      link: "/editais/fm"
    },
    {
      title: "Lei Paulo Gustavo",
      description: "Recursos federais para o setor cultural",
      image: "https://images.unsplash.com/photo-1460666819451-7410f5ef139a?q=80&w=800&auto=format&fit=crop",
      link: "/editais/lpg"
    },
    {
      title: "PNAB",
      description: "Política Nacional Aldir Blanc",
      image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=800&auto=format&fit=crop",
      link: "/editais/pnab"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#2b59c3]">
              Editais Culturais
            </h1>
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
              <div className="w-12 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-xs md:text-lg text-black font-bold px-4">
              Explore as oportunidades de fomento disponíveis e encontre o edital perfeito para o seu projeto cultural.
            </p>
          </div>
        </section>

        <section className="pb-24 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((cat, index) => (
              <Link 
                key={index} 
                to={cat.link}
                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-8">
                    <h3 className="text-2xl font-bold text-white">{cat.title}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{cat.title}</h4>
                  <p className="text-slate-500 font-medium mb-6">{cat.description}</p>
                  <div className="flex items-center gap-2 text-[#2b59c3] font-bold text-sm group-hover:gap-4 transition-all">
                    Ver Editais <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Editais;