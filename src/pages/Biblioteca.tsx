"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Download, BookOpen, Scale, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Biblioteca = () => {
  const categories = [
    {
      title: "Legislação",
      icon: Scale,
      color: "bg-blue-50 text-blue-600",
      documents: [
        { name: "Lei Paulo Gustavo - Federal", size: "1.2 MB" },
        { name: "Política Nacional Aldir Blanc", size: "2.4 MB" },
        { name: "Plano Municipal de Cultura", size: "3.1 MB" },
      ]
    },
    {
      title: "Manuais e Guias",
      icon: BookOpen,
      color: "bg-purple-50 text-purple-600",
      documents: [
        { name: "Guia do Proponente", size: "4.5 MB" },
        { name: "Manual de Prestação de Contas", size: "2.8 MB" },
        { name: "Como elaborar seu projeto", size: "1.9 MB" },
      ]
    },
    {
      title: "Modelos de Documentos",
      icon: FileCheck,
      color: "bg-emerald-50 text-emerald-600",
      documents: [
        { name: "Modelo de Portfólio", size: "0.8 MB" },
        { name: "Planilha Orçamentária", size: "1.1 MB" },
        { name: "Declaração de Residência", size: "0.5 MB" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-blue-600 text-white text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Biblioteca Digital</h1>
            <p className="text-blue-50 text-lg max-w-2xl mx-auto font-medium opacity-90">
              Acesse leis, manuais, modelos de documentos e materiais de apoio para artistas e produtores culturais.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                    <cat.icon size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{cat.title}</h2>
                </div>

                <div className="space-y-3">
                  {cat.documents.map((doc, dIdx) => (
                    <div key={dIdx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          <FileText size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate leading-tight">{doc.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{doc.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <Download size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Help Section */}
        <section className="pb-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 border border-slate-100 shadow-xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Não encontrou o que procurava?</h3>
            <p className="text-slate-500 mb-10 font-medium">
              Nossa equipe está à disposição para tirar dúvidas sobre a documentação necessária para os editais.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 h-14 rounded-xl shadow-lg shadow-blue-100">
              Falar com Suporte
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Biblioteca;