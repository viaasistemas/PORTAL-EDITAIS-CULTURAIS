"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const EditaisFM = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#2b59c3]">
              Editais: Fomento Municipal
            </h1>
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
              <div className="w-12 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-base md:text-lg text-[#2b59c3] font-bold">
              Editais de Extremoz-RN
            </p>
          </div>
        </section>

        <section className="py-8 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/editais')}
              className="bg-white border-slate-200 rounded-xl px-6 h-12 font-bold text-slate-600 flex gap-2 hover:bg-slate-50"
            >
              <ArrowLeft size={18} /> Voltar
            </Button>

            <div className="flex bg-slate-50 p-1.5 rounded-2xl border border-slate-100 shadow-sm">
              {['Todos', 'Abertos', 'Encerrados'].map((tab) => (
                <button
                  key={tab}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                    tab === 'Todos'
                      ? 'bg-[#0a0f1c] text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-slate-50/50 border border-slate-100 rounded-[2rem] p-20 text-center">
            <p className="text-slate-400 font-bold text-lg">
              Em breve, novos editais serão lançados.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EditaisFM;