"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const EditaisLPG = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="pt-32 pb-20 bg-[#2b59c3] text-center text-white relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
              Editais: LPG
            </h1>
            <p className="text-lg md:text-xl opacity-90 font-medium">
              Lei Paulo Gustavo
            </p>
          </div>
        </section>

        {/* Controls Section */}
        <section className="py-8 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-6xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => navigate('/editais')}
              className="bg-white border-slate-200 rounded-xl px-6 h-12 font-bold text-slate-600 flex gap-2 hover:bg-slate-50"
            >
              <ArrowLeft size={18} /> Voltar
            </Button>

            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
              {['Todos', 'Abertos', 'Encerrados'].map((tab) => (
                <button
                  key={tab}
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                    tab === 'Todos'
                      ? 'bg-[#0a0f1c] text-white shadow-lg' 
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Empty State Section */}
        <section className="pb-24 container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-blue-50/50 border border-blue-100 rounded-[2rem] p-20 text-center">
            <p className="text-blue-800 font-bold text-lg">
              Em breve, novos editais serão lançados.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default EditaisLPG;