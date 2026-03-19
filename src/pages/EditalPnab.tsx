"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EditalPnab = () => {
  const editais = [
    {
      id: "3",
      title: "PNAB - Fomento Cultura Popular 2026",
      status: "Aberto",
      date: "Publicado em 05/04/2026",
      description: "Fomento às manifestações culturais populares de Extremoz."
    },
    {
      id: "2",
      title: "PNAB - Fomento às Artes Cênicas 2026",
      status: "Aberto",
      date: "Publicado em 15/03/2026",
      description: "Apoio a projetos de teatro, dança e circo."
    },
    {
      id: "1",
      title: "PNAB - Música Popular Brasileira 2024",
      status: "Encerrado",
      date: "Publicado em 10/01/2024",
      description: "Seleção de projetos musicais de artistas locais."
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Aberto") {
      return <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><Clock size={12} /> Aberto</span>;
    }
    return <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1"><AlertCircle size={12} /> Encerrado</span>;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">PNAB</h1>
            <p className="text-slate-500 font-medium">Política Nacional Aldir Blanc de Fomento à Cultura</p>
          </div>

          <div className="space-y-6">
            {editais.map((edital) => (
              <div key={edital.id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 font-bold text-xs border border-slate-200">
                        {edital.id}
                      </span>
                      {getStatusBadge(edital.status)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{edital.title}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-4">{edital.description}</p>
                    <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{edital.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0">
                    <Link to={`/inscricoes`}>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-6 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-100 transition-all hover:scale-105">
                        Acessar Edital
                        <ArrowRight size={18} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EditalPnab;