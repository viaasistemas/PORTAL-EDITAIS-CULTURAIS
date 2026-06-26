"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Download, BookOpen, Scale, FileCheck, ExternalLink, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Biblioteca = () => {
  const [data, setData] = useState<any[]>([]);

  const categories = [
    { title: "Vídeos Tutoriais", icon: PlayCircle, color: "bg-blue-50 text-blue-600" },
    { title: "Manuais e Guias", icon: BookOpen, color: "bg-purple-50 text-purple-600" },
    { title: "Modelos de Documentos", icon: FileCheck, color: "bg-emerald-50 text-emerald-600" }
  ];

  const fetchData = async () => {
    const { data: items, error } = await supabase
      .from('biblioteca')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && items) {
      setData(items);
    }
  };

  useEffect(() => {
    fetchData();

    const channel = supabase
      .channel('biblioteca-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'biblioteca' },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getItemsByCategory = (catTitle: string) => {
    // Mapeia o título exibido para o título salvo no banco (caso haja divergência)
    return data.filter(item => item.category === catTitle || (catTitle === "Vídeos Tutoriais" && item.category === "Legislação"));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#2b59c3]">
              Biblioteca Digital
            </h1>
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
              <div className="w-12 h-1 bg-yellow-400 rounded-full" />
              <div className="w-12 h-1 bg-red-500 rounded-full" />
            </div>
            <p className="text-xs md:text-lg text-black font-bold px-4">
              Acesse a Vídeos Tutoriais, manuais, modelos de documentos e materiais de apoio para artistas e produtores culturais.
            </p>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {categories.map((cat, idx) => {
              const items = getItemsByCategory(cat.title);
              return (
                <div key={idx} className="space-y-6">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.color}`}>
                      <cat.icon size={24} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">{cat.title}</h2>
                  </div>

                  <div className="space-y-3">
                    {items.length > 0 ? (
                      items.map((doc, dIdx) => (
                        <div key={dIdx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                              {doc.link_url ? <PlayCircle size={20} /> : <FileText size={20} />}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-900 truncate leading-tight">{doc.title}</p>
                              <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">
                                {doc.link_url ? 'Vídeo/Link' : doc.file_name || 'Arquivo'}
                              </p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => {
                              if (doc.link_url) window.open(doc.link_url, '_blank');
                              else toast.info("Download do arquivo iniciado.");
                            }}
                          >
                            {doc.link_url ? <ExternalLink size={18} /> : <Download size={18} />}
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl">
                        <p className="text-slate-400 text-sm font-medium">Nenhum item disponível</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="pb-24 container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 border border-slate-100 shadow-xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Não encontrou o que procurava?</h3>
            <p className="text-slate-500 mb-10 font-medium">
              Nossa equipe está à disposição para tirar dúvidas sobre a documentação necessária para os editais.
            </p>
            <Button className="bg-[#2b59c3] hover:bg-[#1e44a3] text-white font-bold px-10 h-14 rounded-xl shadow-lg shadow-blue-100">
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