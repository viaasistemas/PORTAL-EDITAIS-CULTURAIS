"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EditalCard from '@/components/EditalCard';

const Editais = () => {
  const editais = [
    {
      title: "Fomento Municipal",
      description: "Editais de Extremoz-RN",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "LPG",
      description: "Lei Paulo Gustavo",
      image: "https://images.unsplash.com/photo-1460666819451-7410f5ef139a?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "PNAB",
      description: "Política Nacional Aldir Blanc",
      image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 bg-blue-600 overflow-hidden">
          {/* Background Pattern/Overlay */}
          <div className="absolute inset-0 opacity-20">
            <img 
              src="/src/assets/editais-hero.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 to-blue-600/80" />
          
          <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Editais Culturais
            </h1>
            <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore as oportunidades de fomento disponíveis e encontre o edital perfeito para o seu projeto cultural.
            </p>
          </div>
        </section>

        {/* Cards Grid */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {editais.map((edital, index) => (
              <EditalCard key={index} {...edital} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Editais;